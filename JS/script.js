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

const keys = Array.from(document.getElementsByClassName("key"));
const calculateOutput = document.getElementById("calculate-output");
const tempHistory = document.getElementById("temp-history");
const localHistory = localStorage.getItem("localHistory");
const calcHistory = document.getElementById("calc-history");
let parCounter = 0;
let calcAnswer = "";
let newHistory = "";
let addNum = true;
let deleteOutput = false;
let operationAdd = false;
let deleteAllowed = true;
let objOfHistory = [];
calculateOutput.textContent = 0;
if (localHistory) {
    objOfHistory = JSON.parse(localHistory);
    for (let i = objOfHistory.length - 1; i >= 0; i--) {
        calcHistory.innerHTML += `
            <div class="history-box">
                <div class="history-box-tempHistory">${objOfHistory[i].tempHistoryObj}</div>
                <div class="history-box-calculateOutput">${objOfHistory[i].calculateOutputObj}</div>
            </div>
        `;
    }
}
keys.forEach(function (key) {
    key.addEventListener("click", function () {
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
                tempHistoryAddEndPart(" / 100", " / 10000");
                calculateOutput.textContent = calculateOutput.textContent / 100;
                addNum = false;
                deleteAllowed = false;
                break;

            case "2√x":
                closePar("√ ( ");
                calculateOutput.textContent = Math.sqrt(
                    calculateOutput.textContent
                );
                break;

            case "X^2":
                closePar("sqr ( ");
                calculateOutput.textContent = Math.pow(
                    calculateOutput.textContent,
                    2
                );
                break;

            case "X^3":
                closePar("cube ( ");
                calculateOutput.textContent = Math.pow(
                    calculateOutput.textContent,
                    3
                );
                break;

            case "1/X":
                closePar("1 / ( ");
                calculateOutput.textContent = Math.pow(
                    calculateOutput.textContent,
                    -1
                );
                break;

            case "+/-":
                tempHistoryAddEndPart(" × ( -1 ) ", " × ( -1 ) × ( -1 ) ");
                calculateOutput.textContent = calculateOutput.textContent * -1;
                deleteAllowed = true;
                break;

            case "=":
                parCounter = 0;
                addToHistory();
                tempHistory.textContent = equalChecker();
                tempHistory.textContent += " = ";
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
                if (operationAdd) {
                    tempHistory.textContent = tempHistory.textContent.replace(
                        tempHistory.textContent.charAt(
                            tempHistory.textContent.length - 2
                        ),
                        key.textContent
                    );
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
                operationAdd = false;
                let tempCharChecker = tempHistory.textContent.charAt(
                    tempHistory.textContent.length - 2
                );
                if (
                    tempCharChecker == "+" ||
                    tempCharChecker == "-" ||
                    tempCharChecker == "×" ||
                    tempCharChecker == "÷"
                )
                    calcAnswer += tempCharChecker;
                deleteAllowed = true;
            default:
                calculateOutput.textContent += key.textContent;
        }
        if (!calculateOutput.textContent) calculateOutput.textContent = "0";
    });
});
function tempHistoryAddEndPart(checkFor, replace) {
    if (tempHistory.textContent.indexOf(checkFor) == -1) {
        console.log("first");
        tempHistory.textContent += calculateOutput.textContent + checkFor;
    } else {
        tempHistory.textContent = tempHistory.textContent.replace(
            checkFor,
            replace
        );
    }
}
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
function trimAns() {
    for (let i = 1; i <= calcAnswer.length; i++) {
        calcAnswer = calcAnswer.replace("--", "-");
        calcAnswer = calcAnswer.replace("++", "+");
        calcAnswer = calcAnswer.replace("××", "×");
        calcAnswer = calcAnswer.replace("÷÷", "÷");
    }
}
function showAns(add) {
    trimAns();
    if (add) calcAnswer += calculateOutput.textContent;
    calcAnswer = calcAnswer.replace(/×/g, "*");
    calcAnswer = calcAnswer.replace(/÷/g, "/");
    console.log("+R --> ", calcAnswer);
    try {
        let tempCalc = eval(calcAnswer);
        calculateOutput.textContent = tempCalc;
        return tempCalc;
    } catch {
        calculateOutput.textContent = "Oops error!";
        tempHistory.textContent = "";
    }
}
let rootNum;
function closePar(operation) {
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

if (!calcHistory.textContent) {
    calcHistory.innerHTML = `
    <div id="empty-history">There's no history yet</div>
    `;
}

function addToHistory() {
    if (
        calcHistory.innerHTML.trim() ==
        `<div id="empty-history">There's no history yet</div>`
    )
        calcHistory.innerHTML = "";
    let spaceAdder = equalChecker() + "  = ";
    spaceAdder = spaceAdder.replace("+", "  +  ");
    spaceAdder = spaceAdder.replace("-", "  -  ");
    spaceAdder = spaceAdder.replace("×", "  ×  ");
    spaceAdder = spaceAdder.replace("÷", "  ÷  ");
    trimAns();
    let tempAns = calcAnswer;
    tempAns += calculateOutput.textContent;
    tempAns = tempAns.replace(/×/g, "*");
    tempAns = tempAns.replace(/÷/g, "/");
    let tempCalc = eval(tempAns);
    console.log("=>", spaceAdder, tempCalc);
    if (tempCalc) {
        calcHistory.innerHTML =
            `
        <div class="history-box">
            <div class="history-box-tempHistory">${spaceAdder}</div>
            <div class="history-box-calculateOutput">${tempCalc}</div>
        </div>
    ` + calcHistory.innerHTML;
        let tempHistoryAdder = tempHistory.textContent;
        if (addNum) tempHistoryAdder += calculateOutput.textContent;
        console.log(typeof objOfHistory);
        objOfHistory.push(new historyToObj(spaceAdder, tempCalc, tempAns));
        localStorage.setItem("localHistory", JSON.stringify(objOfHistory));
        console.log(objOfHistory);
    } else tempHistory.textContent = "";
}
// localStorage.clear()
const historyDeleteBtn = document.getElementById("history-delete-btn");
historyDeleteBtn.addEventListener("click", function () {
    calcHistory.innerHTML = `
    <div id="empty-history">There's no history yet</div>
    `;
    objOfHistory = [];
    localStorage.setItem("localHistory", []);
});
function historyToObj(tempHistory, calculateOutput, calcAnswer) {
    this.tempHistoryObj = tempHistory;
    this.calculateOutputObj = calculateOutput;
    this.calcAnswerObj = calcAnswer;
}
