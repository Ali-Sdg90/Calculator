const themeBtn = document.getElementById("change-theme");
const localTheme = localStorage.getItem("localTheme");
const root = document.querySelector(":root");
let themeCounter = 0;

if (localTheme) themeCounter = localTheme;
changeTheme();
function changeTheme() {
    switch (themeCounter) {
        //black ⇩
        case 0:
            root.style.cssText = `
                --font-family: sans-serif;
                --font-style: normal;
                --transition: 0.5s;
                --radius-keys: 2px;
                --radius-btns: 4px;
                --main-color: white;
                --background: rgb(36, 36, 40);
                --line-color: rgb(65, 115, 208);
                --light-key-color: rgb(80, 79, 86);
                --dark-key-color: rgb(65, 64, 71);
                --btn-hover: rgba(84, 84, 84, 0.73);
                --active: rgb(47, 46, 51);
                --key-hover: rgb(52, 51, 56);
                `;
            break;
        //white ⇩
        case 1:
            root.style.cssText = `
                --font-family: sans-serif;
                --font-style: normal;
                --transition: 0.5s;
                --radius-keys: 2px;
                --radius-btns: 4px;
                --main-color: black;
                --background: rgb(203, 203, 203);
                --line-color: rgb(208, 134, 65);
                --light-key-color: rgb(241, 241, 241);
                --dark-key-color: rgb(228, 228, 228);
                --btn-hover: rgb(188, 188, 188);
                --active: rgb(191, 191, 191);
                --key-hover: #c8c8c8;
                `;
            break;
        //green ⇩
        case 2:
            root.style.cssText = `
                --font-family: monospace;
                --font-style: normal;
                --transition: 0.5s;
                --radius-keys: 16px;
                --radius-btns: 20px;
                --main-color: black;
                --background: #D6EE73;
                --line-color: #D2C250;
                --light-key-color: #98D42A;
                --dark-key-color: #72D429;
                --btn-hover: #36A533;
                --active: rgb(54, 165, 51);
                --key-hover: #36A533;
                `;
            break;
        //blue ⇩
        case 3:
            root.style.cssText = `
                --font-family: cursive;
                --font-style: italic;
                --transition: 0.5s;
                --radius-keys: 15px 0;
                --radius-btns: 10px;
                --main-color: black;
                --background: #C0ECFB;
                --line-color: #D2C250;
                --light-key-color: #73D6F3;
                --dark-key-color: #1AC8F2;
                --btn-hover: #006CBF;
                --active: #006CBF;
                --key-hover: #006DC1;
                `;
            break;
    }
    setTimeout(() => {
        document.documentElement.style.setProperty(
            "--transition",
            "color 0.15s, background-color 0.15s"
        );
    }, 500);
    localStorage.setItem("localTheme", themeCounter);
}
themeBtn.addEventListener("click", function () {
    if (themeCounter > 2) {
        themeCounter = 0;
        localStorage.setItem("localTheme", 0);
    } else themeCounter++;
    changeTheme();
});
// localStorage.clear();

//---------------------

//Calculator calculation operations :

const keys = Array.from(document.getElementsByClassName("key"));
const calculateOutput = document.getElementById("calculate-output");
const tempHistory = document.getElementById("temp-history");
const calcHistory = document.getElementById("calc-history");
const historyDeleteBtn = document.getElementById("history-delete-btn");
let localMemory = localStorage.getItem("localMemory");
let parCounter = 0;
let calcAnswer = "";
let newHistory = "";
let addNum = true;
let deleteOutput = false;
let operationAdd = false;
let deleteAllowed = true;
let nextShowMemory = true;
let objOfHistory = [];
let objOfMemory = [];
calculateOutput.textContent = 0;

const HistoryOrMemory = Array.from(
    document.getElementsByClassName("History-Memory")
);
HistoryOrMemory.forEach(function (page) {
    page.addEventListener("click", function () {
        switch (page.textContent) {
            case "History":
                if (nextShowMemory) break;
                nextShowMemory = true;
                showHistory();
                break;
            case "Memory":
                if (!nextShowMemory) break;
                showMemory();
                nextShowMemory = false;
                break;
        }
    });
});

//Restore History ⇩
function showHistory() {
    const localHistory = localStorage.getItem("localHistory");
    if (localHistory) {
        objOfHistory = JSON.parse(localHistory);
        calcHistory.innerHTML = "";
        for (let i = objOfHistory.length - 1; i >= 0; i--) {
            calcHistory.innerHTML += `
            <div class="history-box">
                <div class="history-box-tempHistory">${objOfHistory[i].spaceAddedHistoryObj}</div>
                <div class="history-box-calculateOutput">${objOfHistory[i].calculateOutputObj}</div>
            </div>
        `;
        }
        historyDeleteBtn.style.display = "flex";
    } else {
        calcHistory.innerHTML = `
            <div id="empty-history">There's no history yet</div>
        `;
        historyDeleteBtn.style.display = "none";
    }
}
showHistory();

//Restore Memory ⇩
function showMemory() {
    localMemory = localStorage.getItem("localMemory");
    if (localMemory.length>2) {
        objOfMemory = JSON.parse(localMemory);
        calcHistory.innerHTML = "";
        for (let i = objOfMemory.length - 1; i >= 0; i--) {
            calcHistory.innerHTML += `
            <div class="memory-box">
                <div class="memory-box-number">${objOfMemory[i]}</div>
                <div class="memory-box-btns">
                    <div>MC</div>
                    <div>M+</div>
                    <div>M-</div>
                </div>
            </div>
        `;
        }
        historyDeleteBtn.style.display = "flex";
    } else {
        calcHistory.innerHTML = `
            <div id="empty-history">There's nothing saved in memory</div>
        `;
        historyDeleteBtn.style.display = "none";
    }
}

if (localMemory) {
    objOfMemory = JSON.parse(localMemory);
}
//Press the main keys ⇩
keys.forEach(function (key) {
    key.addEventListener("click", function () {
        //newHistory after =  ⇩
        if (newHistory) {
            if (
                key.textContent != "CE" &&
                key.textContent != "X^3" &&
                key.textContent != "X^2" &&
                key.textContent != "2√x"
            ) {
                tempHistory.textContent = newHistory;
                calcAnswer = newHistory;
            } else {
                tempHistory.textContent = "";
            }
        }
        newHistory = "";
        //deleteOutput after = & +-/* ⇩
        if (deleteOutput) {
            if (
                key.textContent != "X^3" &&
                key.textContent != "X^2" &&
                key.textContent != "2√x"
            )
                calculateOutput.textContent = "";
        }
        deleteOutput = false;
        switch (key.textContent) {
            case "DEL":
                if (!deleteAllowed) break;
                if (
                    calculateOutput.textContent < 0 &&
                    calculateOutput.textContent > -10
                )
                    calculateOutput.textContent =
                        calculateOutput.textContent.slice(1, -1);
                else
                    calculateOutput.textContent =
                        calculateOutput.textContent.slice(0, -1);
                break;

            case "CE":
                calculateOutput.textContent = "";
                parCounter = 0;
                calcAnswer = "";
                addNum = true;
                break;

            case "C":
                calculateOutput.textContent = "";
                tempHistory.textContent = "";
                parCounter = 0;
                calcAnswer = "";
                addNum = true;
                break;

            case "%":
                tempHistoryAddEndPart("/ 100 ");
                calculateOutput.textContent = calculateOutput.textContent / 100;
                deleteAllowed = false;
                break;

            case "2√x":
                parCalculate("√ ( ");
                calculateOutput.textContent = Math.sqrt(
                    calculateOutput.textContent
                );
                break;

            case "X^2":
                parCalculate("sqr ( ");
                calculateOutput.textContent = Math.pow(
                    calculateOutput.textContent,
                    2
                );
                break;

            case "X^3":
                parCalculate("cube ( ");
                calculateOutput.textContent = Math.pow(
                    calculateOutput.textContent,
                    3
                );
                break;

            case "1/X":
                parCalculate("1 / ( ");
                calculateOutput.textContent = Math.pow(
                    calculateOutput.textContent,
                    -1
                );
                break;

            case "+/-":
                tempHistoryAddEndPart("× ( -1 ) ");
                calculateOutput.textContent = calculateOutput.textContent * -1;
                deleteAllowed = true;
                break;

            case "=":
                parCounter = 0;
                addToHistory();
                tempHistory.textContent = equalChecker() + " = ";
                calcAnswer = showAns(true);
                if (calcAnswer != tempHistory.textContent) addNum = false;
                calculateOutput.textContent = calcAnswer;
                newHistory = calcAnswer;
                calcAnswer = "";
                deleteOutput = true;
                deleteAllowed = true;
                break;

            case "+":
            case "-":
            case "×":
            case "÷":
                parCounter = 0;
                //addToHistory separator ⇩
                calcAnswer = calcAnswer.toString();
                let tempOperationCounter = 0;
                trimAns();
                if (calcAnswer.indexOf("+") != -1) tempOperationCounter++;
                if (calcAnswer.indexOf("-") != -1) tempOperationCounter++;
                if (calcAnswer.indexOf("÷") != -1) tempOperationCounter++;
                if (calcAnswer.indexOf("×") != -1) tempOperationCounter++;
                if (tempOperationCounter > 0) {
                    addToHistory();
                    calcAnswer = showAns(false);
                    tempHistory.textContent = "";
                }
                //Enter back to back +-/* ⇩
                if (operationAdd) {
                    tempHistory.textContent = tempHistory.textContent.replace(
                        tempHistory.textContent.charAt(
                            tempHistory.textContent.length - 2
                        ),
                        key.textContent
                    );
                    //add to tempHistory correct operation ⇩
                } else {
                    operationAdd = true;
                    showAns(true);
                    if (addNum) {
                        tempHistory.textContent +=
                            calculateOutput.textContent +
                            " " +
                            key.textContent +
                            " ";
                    } else {
                        tempHistory.textContent += " " + key.textContent + " ";
                    }
                }
                addNum = true;
                deleteOutput = true;
                deleteAllowed = true;
                break;

            case ".":
                if (calculateOutput.textContent.indexOf(".") != -1) {
                    deleteAllowed = true;
                    break;
                }
                if (deleteOutput) calculateOutput.textContent = "0";
                calculateOutput.textContent += key.textContent;
                deleteAllowed = true;
                break;

            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                if (calculateOutput.textContent == "0")
                    calculateOutput.textContent = "";
                //check operationAdd and add operation to tempHistory ⇩
                operationAdd = false;
                let charChecker = tempHistory.textContent.charAt(
                    tempHistory.textContent.length - 2
                );
                if (
                    charChecker == "+" ||
                    charChecker == "-" ||
                    charChecker == "×" ||
                    charChecker == "÷"
                )
                    calcAnswer += charChecker;
                deleteAllowed = true;
            default:
                calculateOutput.textContent += key.textContent;
        }
        if (!calculateOutput.textContent) calculateOutput.textContent = "0";
    });
});

//for % and +/- ⇩
function tempHistoryAddEndPart(operation) {
    if (tempHistory.textContent.indexOf(operation) == -1) {
        tempHistory.textContent +=
            calculateOutput.textContent + " " + operation;
    } else {
        tempHistory.textContent += operation;
    }
    addNum = false;
}

//function befor = to output ⇩
function equalChecker() {
    let coppyTempHistory = tempHistory.textContent;
    const coppyCalculateOutput = calculateOutput.textContent;
    const checker = tempHistory.textContent.charAt(
        tempHistory.textContent.length - 2
    );
    if (checker == "+" || checker == "-" || checker == "×" || checker == "÷")
        coppyTempHistory += coppyCalculateOutput;
    return coppyTempHistory;
}

//trim calcAnswer ⇩
function trimAns() {
    for (let i = 1; i <= calcAnswer.length; i++) {
        calcAnswer = calcAnswer.replace("--", "-");
        calcAnswer = calcAnswer.replace("++", "+");
        calcAnswer = calcAnswer.replace("××", "×");
        calcAnswer = calcAnswer.replace("÷÷", "÷");
    }
}

//return calculated calcAnswer by eval() ⇩
function showAns(add) {
    trimAns();
    if (add) calcAnswer += calculateOutput.textContent;
    calcAnswer = calcAnswer.replace(/×/g, "*");
    calcAnswer = calcAnswer.replace(/÷/g, "/");
    // console.log("+R --> ", calcAnswer);
    try {
        let tempCalc = eval(calcAnswer);
        calculateOutput.textContent = tempCalc;
        return tempCalc;
    } catch {
        calculateOutput.textContent = "Oops error!";
        tempHistory.textContent = "";
    }
}

//parCalculate for 2√x X^2 X^3 1/X ⇩
let rootNum;
function parCalculate(operation) {
    parCounter++;
    if (parCounter == 1) {
        rootNum = calculateOutput.textContent;
        tempHistory.textContent += `${operation}${rootNum} ) `;
    } else
        tempHistory.textContent = tempHistory.textContent.replace(
            rootNum,
            `${operation}${rootNum} ) `
        );
    addNum = false;
    deleteAllowed = false;
}

//delete button ⇩
historyDeleteBtn.addEventListener("click", function () {
    calcHistory.innerHTML = `
    <div id="empty-history">There's no history yet</div>
    `;
    historyDeleteBtn.style.display = "none";
    objOfHistory = [];
    localStorage.setItem("localHistory", []);
});

//addToHistory by +-*/ and = ⇩
function addToHistory() {
    if (
        calcHistory.innerHTML.trim() ==
        `<div id="empty-history">There's no history yet</div>`
    ) {
        calcHistory.innerHTML = "";
        historyDeleteBtn.style.display = "flex";
    }
    let spaceAdder = equalChecker() + "  = ";
    spaceAdder = spaceAdder.replace("+", "  +  ");
    spaceAdder = spaceAdder.replace("-", "  -  ");
    spaceAdder = spaceAdder.replace("×", "  ×  ");
    spaceAdder = spaceAdder.replace("÷", "  ÷  ");
    spaceAdder = spaceAdder.replace("(   -  1 )", "( -1 )");
    trimAns();
    let tempAns = calcAnswer;
    tempAns += calculateOutput.textContent;
    tempAns = tempAns.replace(/×/g, "*");
    tempAns = tempAns.replace(/÷/g, "/");
    try {
        let tempCalc = eval(tempAns);

        //add to History ⇩
        if (tempCalc) {
            if (nextShowMemory) {
                calcHistory.innerHTML =
                    `
                    <div class="history-box">
                        <div class="history-box-tempHistory">${spaceAdder}</div>
                        <div class="history-box-calculateOutput">${tempCalc}</div>
                    </div>
                ` + calcHistory.innerHTML;
            }
            //add to localStorge ⇩
            objOfHistory.push(
                new historyToObj(spaceAdder, tempCalc, equalChecker())
            );
            localStorage.setItem("localHistory", JSON.stringify(objOfHistory));
        } else tempHistory.textContent = "";
    } catch {
        calculateOutput.textContent = "Oops error!";
        tempHistory.textContent = "";
    }
}
// localStorage.clear()

//obj constructor for localStorge ⇩
function historyToObj(spaceAddedHistory, calculateOutput, tempHistory) {
    this.spaceAddedHistoryObj = spaceAddedHistory;
    this.calculateOutputObj = calculateOutput;
    this.tempHistoryObj = tempHistory;
}

//click on one historyBox ⇩
const historyBox = document.getElementsByClassName("history-box");
let historyBtnCounter = 0;
document
    .getElementById("calc-history")
    .addEventListener("mouseenter", function () {
        try {
            for (let i = 0; i < historyBox.length; i++) {
                historyBox[i].addEventListener("click", function () {
                    let objNumber = historyBox.length - i - 1;
                    calculateOutput.textContent =
                        objOfHistory[objNumber].calculateOutputObj;
                    tempHistory.textContent =
                        objOfHistory[objNumber].tempHistoryObj;
                    if (historyBtnCounter++ > 0)
                        newHistory = objOfHistory[objNumber].calculateOutputObj;
                    calcAnswer = "";
                    addNum = false;
                });
            }
        } catch {}
    });

const mBtns = Array.from(document.getElementsByClassName("memory-btn"));
mBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        switch (btn.textContent) {
            case "MC":
                objOfMemory = [];
                calcHistory.innerHTML = `
                    <div id="empty-history">There's nothing saved in memory</div>
                `;
                historyDeleteBtn.style.display = "none";
                break;
            case "MR":
                calculateOutput.textContent =
                    objOfMemory[objOfMemory.length - 1];
                break;
            case "M+":
                if (calculateOutput.textContent < 0) {
                    objOfMemory[objOfMemory.length - 1] = eval(
                        objOfMemory[objOfMemory.length - 1] +
                            calculateOutput.textContent
                    );
                } else {
                    objOfMemory[objOfMemory.length - 1] = eval(
                        objOfMemory[objOfMemory.length - 1] +
                            "+" +
                            calculateOutput.textContent
                    );
                }
                break;
            case "M-":
                objOfMemory[objOfMemory.length - 1] -=
                    calculateOutput.textContent;
                break;
            case "MS":
                objOfMemory.push(calculateOutput.textContent);
                break;
        }
        localStorage.setItem("localMemory", JSON.stringify(objOfMemory));
        showMemory();
    });
});
// localStorage.clear()