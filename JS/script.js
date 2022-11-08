const key100 = document.querySelector(".numbers div:nth-child(1)");
const keyCE = document.querySelector(".numbers div:nth-child(2)");
const keyC = document.querySelector(".numbers div:nth-child(3)");
const keyDEL = document.querySelector(".numbers div:nth-child(4)");
const key1X = document.querySelector(".numbers div:nth-child(5)");
const keyX2 = document.querySelector(".numbers div:nth-child(6)");
const key2X = document.querySelector(".numbers div:nth-child(7)");
const keyDiv = document.querySelector(".numbers div:nth-child(8)");
const key7 = document.querySelector(".numbers div:nth-child(9)");
const key8 = document.querySelector(".numbers div:nth-child(10)");
const key9 = document.querySelector(".numbers div:nth-child(11)");
const keyX = document.querySelector(".numbers div:nth-child(12)");
const key4 = document.querySelector(".numbers div:nth-child(13)");
const key5 = document.querySelector(".numbers div:nth-child(14)");
const key6 = document.querySelector(".numbers div:nth-child(15)");
const keyMinus = document.querySelector(".numbers div:nth-child(16)");
const key1 = document.querySelector(".numbers div:nth-child(17)");
const key2 = document.querySelector(".numbers div:nth-child(18)");
const key3 = document.querySelector(".numbers div:nth-child(19)");
const keyPlus = document.querySelector(".numbers div:nth-child(20)");
const keyPM = document.querySelector(".numbers div:nth-child(21)");
const key0 = document.querySelector(".numbers div:nth-child(22)");
const keyDec = document.querySelector(".numbers div:nth-child(23)");
const keyResult = document.querySelector(".numbers div:nth-child(24)");
const inputNum = document.getElementById("calculate");
let inputHistory = "";
const numsArr = [key0, key1, key2, key3, key4, key5, key6, key7, key8, key9];
const keysArr = [keyDiv, keyX, keyMinus, keyPlus];
for (let i of numsArr) {
    i.addEventListener("click", function () {
        if (inputNum.textContent == 0) inputNum.textContent = "";
        inputNum.textContent += i.innerHTML;
        console.log(inputNum.textContent);
    });
}
for (let i of keysArr) {
    i.addEventListener("click", function () {
        inputHistory = inputNum.innerHTML + " " + i.innerHTML;
        // inputNum.innerHTML = "0";
        console.log(inputHistory);
    });
}
