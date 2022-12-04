const themeBtn = document.getElementById("change-theme");
const localTheme = localStorage.getItem("localTheme");
const root = document.querySelector(":root");
let themeCounter = 1;

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
keys.forEach(function (key) {
    key.addEventListener("click", function () {
        // tempHistory.textContent += key.textContent;
        if (calculateOutput.textContent == "0")
            calculateOutput.textContent = "";
        switch (key.textContent) {
            case "DEL":
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
                break;

            case "C":
                calculateOutput.textContent = "";
                tempHistory.textContent = "";
                break;

            case "%":
                calculateOutput.textContent = calculateOutput.textContent / 100;
                break;

            case "2√x":
                calculateOutput.textContent = Math.sqrt(
                    calculateOutput.textContent
                );
                break;

            case "X^2":
                calculateOutput.textContent = Math.pow(
                    calculateOutput.textContent,
                    2
                );
                break;

            case "X^3":
                calculateOutput.textContent = Math.pow(
                    calculateOutput.textContent,
                    3
                );
                break;

            case "1/X":
                calculateOutput.textContent = Math.pow(
                    calculateOutput.textContent,
                    -1
                );
                break;

            case "+/-":
                calculateOutput.textContent = calculateOutput.textContent * -1;
                break;

            case "=":
                for (i of calculateOutput.textContent) {
                    calculateOutput.textContent =
                        calculateOutput.textContent.replace(/×/g, "*");
                    calculateOutput.textContent =
                        calculateOutput.textContent.replace(/÷/g, "/");
                }
                calculateOutput.textContent = eval(calculateOutput.textContent);
                resetCalc = true;
                break;

            default:
                calculateOutput.textContent += key.textContent;
        }
        if (!calculateOutput.textContent) calculateOutput.textContent = "0";
    });
});
