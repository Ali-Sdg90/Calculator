// localStorage.clear()

//add animation for history and memory
function addBoxAnimation(addBox) {
    addBox.style.transform = "translate(0,-20px)";
    addBox.style.opacity = 0;
    setTimeout(() => {
        addBox.style.transform = "translate(0,0)";
        addBox.style.opacity = 1;
    }, 70);
}

//obj constructor for history localStorge ⇩
function historyToObj(spaceAddedHistory, calculateOutput, tempHistory) {
    this.spaceAddedHistoryObj = spaceAddedHistory;
    this.calculateOutputObj = calculateOutput;
    this.tempHistoryObj = tempHistory;
}

//click on historyBox ⇩
const historyBox = document.getElementsByClassName("history-box");
let historyBtnCounter = 0;
document
    .getElementById("calc-history")
    .addEventListener("mouseenter", function () {
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
    });

//click on MC / MR / M+ / M- ⇩
const mBtns = Array.from(document.getElementsByClassName("memory-btn"));
mBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        let MsPress = false;
        switch (btn.textContent) {
            case "MC":
                if (objOfMemory.length < 1) break;
                objOfMemory = [];
                break;
            case "MR":
                if (objOfMemory.length < 1) break;
                calculateOutput.textContent =
                    objOfMemory[objOfMemory.length - 1];
                break;
            case "M+":
                if (objOfMemory.length < 1) {
                    objOfMemory.push(calculateOutput.textContent);
                    MsPress = true;
                    break;
                }
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
                if (objOfMemory.length < 1) {
                    objOfMemory.push(calculateOutput.textContent * -1);
                    MsPress = true;
                    break;
                }
                objOfMemory[objOfMemory.length - 1] -=
                    calculateOutput.textContent;
                break;
            case "MS":
                objOfMemory.push(calculateOutput.textContent);
                MsPress = true;
                break;
        }
        tempHistory.textContent = "";
        parCounter = 0;
        calcAnswer = "";
        addNum = false;
        localStorage.setItem("localMemory", JSON.stringify(objOfMemory));
        if (MsPress) {
            showMemory(true);
            MsPress = false;
        } else showMemory(false);
    });
});
// localStorage.clear()

//click on memoryBox ⇩
const memoryBoxNum = document.getElementsByClassName("memory-box__number");
const memoryBoxMc = document.getElementsByClassName("memory-box-mc");
const memoryBoxMp = document.getElementsByClassName("memory-box-mp");
const memoryBoxMm = document.getElementsByClassName("memory-box-mm");
document
    .getElementById("calc-history")
    .addEventListener("mouseenter", function () {
        for (let i = 0; i < memoryBoxNum.length; i++) {
            let objOfMemoryI = objOfMemory.length - i - 1;
            //click on number ⇩
            memoryBoxNum[i].addEventListener("click", function () {
                calculateOutput.textContent = memoryBoxNum[i].textContent;
                calcAnswer = "";
                addNum = true;
                tempHistory.textContent = "";
            });
            //click on MC ⇩
            memoryBoxMc[i].addEventListener("click", function () {
                objOfMemory.splice(objOfMemoryI, 1);
                localStorage.setItem(
                    "localMemory",
                    JSON.stringify(objOfMemory)
                );
                showMemory(false);
            });
            //click on M+ ⇩
            memoryBoxMp[i].addEventListener("click", function () {
                if (calculateOutput.textContent < 0) {
                    objOfMemory[objOfMemoryI] = eval(
                        objOfMemory[objOfMemoryI] + calculateOutput.textContent
                    );
                } else {
                    objOfMemory[objOfMemoryI] = eval(
                        objOfMemory[objOfMemoryI] +
                            "+" +
                            calculateOutput.textContent
                    );
                }
                localStorage.setItem(
                    "localMemory",
                    JSON.stringify(objOfMemory)
                );
                showMemory(false);
            });
            //click on M- ⇩
            memoryBoxMm[i].addEventListener("click", function () {
                objOfMemory[objOfMemoryI] -= calculateOutput.textContent;
                localStorage.setItem(
                    "localMemory",
                    JSON.stringify(objOfMemory)
                );
                showMemory(false);
            });
        }
    });
