const keys = Array.from(document.getElementsByClassName("key"));
const calculateOutput = document.querySelector(".calculate__output");
const tempHistory = document.querySelector(".calculate__temp-history");
const calcHistory = document.getElementById("calc-history");
const historyDeleteBtn = document.querySelector(".history-delete__btn");
const historyHr = document.querySelectorAll(".history-hr");
const grayBtns = document.getElementsByClassName("gray-btn");
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

//change page history/memory ⇩
const HistoryOrMemory = Array.from(
    document.getElementsByClassName("history-memory")
);
HistoryOrMemory.forEach(function (page) {
    page.addEventListener("click", function () {
        switch (page.textContent) {
            case "History":
                if (nextShowMemory) break;
                nextShowMemory = true;
                historyHr[1].style.opacity = "0";
                historyHr[0].style.opacity = "1";
                showHistory();
                document
                    .querySelectorAll(".history-box")
                    .forEach(function (box) {
                        box.style.transform = "translate(-20px)";
                        box.style.opacity = 0;
                        setTimeout(() => {
                            box.style.transform = "translate(0px)";
                            box.style.opacity = 1;
                        }, 70);
                    });
                break;
            case "Memory":
                if (!nextShowMemory) break;
                nextShowMemory = false;
                historyHr[0].style.opacity = "0";
                historyHr[1].style.opacity = "1";
                showMemory(false);
                document
                    .querySelectorAll(".memory-box")
                    .forEach(function (box) {
                        box.style.transform = "translate(20px)";
                        box.style.opacity = 0;
                        setTimeout(() => {
                            box.style.transform = "translate(0px)";
                            box.style.opacity = 1;
                        }, 70);
                    });
                break;
        }
    });
});
historyHr[1].style.opacity = "0";

//Show History ⇩
function showHistory() {
    const localHistory = localStorage.getItem("localHistory");
    if (localHistory) {
        objOfHistory = JSON.parse(localHistory);
        calcHistory.innerHTML = "";
        for (let i = objOfHistory.length - 1; i >= 0; i--) {
            calcHistory.innerHTML += `
            <div class="history-box">
                <div class="history-box__tempHistory">${objOfHistory[i].spaceAddedHistoryObj}</div>
                <div class="history-box__calculateOutput">${objOfHistory[i].calculateOutputObj}</div>
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
showMemory(false);
showHistory();

//Show Memory ⇩
function showMemory(numAdded) {
    localMemory = localStorage.getItem("localMemory");
    if (!localMemory) localMemory = [];
    if (localMemory.length > 2) {
        objOfMemory = JSON.parse(localMemory);
        if (!nextShowMemory) {
            calcHistory.innerHTML = "";
            for (let i = objOfMemory.length - 1; i >= 0; i--) {
                calcHistory.innerHTML += `
                <div class="memory-box">
                    <div class="memory-box__number">${objOfMemory[i]}</div>
                    <div class="memory-box__btns">
                        <div class="memory-box-mc">MC</div>
                        <div class="memory-box-mp">M+</div>
                        <div class="memory-box-mm">M-</div>
                    </div>
                </div>
            `;
                if (numAdded) {
                    let addBox = document.querySelectorAll(".memory-box");
                    addBoxAnimation(addBox[0]);
                }
            }
            historyDeleteBtn.style.display = "flex";
        }
        grayBtns[0].style.color = "var(--main-color)";
        grayBtns[1].style.color = "var(--main-color)";
        grayBtns[0].classList.add("btn-hover");
        grayBtns[1].classList.add("btn-hover");
    } else {
        calcHistory.innerHTML = `
            <div id="empty-history">There's nothing saved in memory</div>
        `;
        historyDeleteBtn.style.display = "none";
        grayBtns[0].style.color = "gray";
        grayBtns[1].style.color = "gray";
        grayBtns[0].classList.remove("btn-hover");
        grayBtns[1].classList.remove("btn-hover");
    }
}

//Press the main keys ⇩
keys.forEach(function (key) {
    key.addEventListener("click", function () {
        let newKey = key.getAttribute("value");
        //newHistory after =  ⇩
        if (newHistory) {
            if (
                newKey != "CE" &&
                newKey != "X³" &&
                newKey != "X²" &&
                newKey != "√x"
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
            if (newKey != "X³" && newKey != "X²" && newKey != "√x")
                calculateOutput.textContent = "";
        }
        deleteOutput = false;
        if (!tempHistory.textContent) addNum = true;
        switch (newKey) {
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

            case "√x":
                parCalculate("√ ( ");
                calculateOutput.textContent = Math.sqrt(
                    calculateOutput.textContent
                );
                break;

            case "X²":
                parCalculate("sqr ( ");
                calculateOutput.textContent = Math.pow(
                    calculateOutput.textContent,
                    2
                );
                break;

            case "X³":
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
                        newKey
                    );
                    //add to tempHistory correct operation ⇩
                } else {
                    operationAdd = true;
                    showAns(true);
                    if (addNum) {
                        tempHistory.textContent +=
                            calculateOutput.textContent + " " + newKey + " ";
                    } else {
                        tempHistory.textContent += " " + newKey + " ";
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
                calculateOutput.textContent += newKey;
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
                calculateOutput.textContent += newKey;
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

//return calculated calcAnswer by calc() ⇩
function showAns(add) {
    trimAns();
    if (add) calcAnswer += calculateOutput.textContent;
    calcAnswer = calcAnswer.replace(/×/g, "*");
    calcAnswer = calcAnswer.replace(/÷/g, "/");

    console.log("calcAnswer --> ", calcAnswer);

    try {
        let tempCalc = calc(calcAnswer);
        calculateOutput.textContent = tempCalc;
        return tempCalc;
    } catch {
        calculateOutput.textContent = "Oops error!";
        tempHistory.textContent = "";
    }
}

//parCalculate for √x X² X³ 1/X ⇩
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
    if (nextShowMemory) {
        localStorage.setItem("localHistory", []);
        objOfHistory = [];
        showHistory();
    } else {
        localStorage.setItem("localMemory", []);
        objOfMemory = [];
        showMemory(false);
    }
});

//addToHistory & localStorge by +-*/ and = ⇩
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
        let tempCalc = calc(tempAns);
        //add to History ⇩
        if (tempCalc) {
            if (nextShowMemory) {
                calcHistory.innerHTML =
                    `
                    <div class="history-box">
                        <div class="history-box__tempHistory">${spaceAdder}</div>
                        <div class="history-box__calculateOutput">${tempCalc}</div>
                    </div>
                ` + calcHistory.innerHTML;
                let addBox = document.querySelectorAll(".history-box");
                addBoxAnimation(addBox[0]);
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

//better method for calculate than use eval() ⇩
function calc(str) {
    const tempFunc = new Function("return " + str);
    return tempFunc();
}
