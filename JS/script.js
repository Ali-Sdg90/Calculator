const themeBtn = document.getElementById("change-theme");
const localTheme = localStorage.getItem("localTheme");
let themeCounter = 1;

if (localTheme) themeCounter = localTheme;
changeTheme();
function changeTheme() {
    // console.log(themeCounter);
    document.documentElement.style.setProperty("--transition", "0.5s");
    //black ⇩
    if (themeCounter == 0) {
        document.documentElement.style.setProperty(
            "--background",
            "rgb(36, 36, 40)"
        );
        document.documentElement.style.setProperty("--main-color", "white");
        document.documentElement.style.setProperty(
            "--line-color",
            "rgb(65, 115, 208)"
        );
        document.documentElement.style.setProperty(
            "--light-key-color",
            "rgb(80, 79, 86)"
        );
        document.documentElement.style.setProperty(
            "--dark-key-color",
            "rgb(65, 64, 71)"
        );
        document.documentElement.style.setProperty(
            "--btn-hover",
            "rgba(84, 84, 84, 0.73)"
        );
        document.documentElement.style.setProperty(
            "--btn-active",
            "rgb(47, 46, 51)"
        );
        document.documentElement.style.setProperty(
            "--key-hover",
            "rgb(52, 51, 56)"
        );
        document.documentElement.style.setProperty("--radius-keys", "2px");
        document.documentElement.style.setProperty("--radius-btns", "4px");
        document.documentElement.style.setProperty(
            "--font-family",
            "sans-serif"
        );
        document.documentElement.style.setProperty("--font-style", "normal");
    }
    //white ⇩
    if (themeCounter == 1) {
        document.documentElement.style.setProperty("--main-color", "black");
        document.documentElement.style.setProperty(
            "--background",
            "rgb(203, 203, 203)"
        );
        document.documentElement.style.setProperty(
            "--line-color",
            "rgb(208, 134, 65)"
        );
        document.documentElement.style.setProperty(
            "--light-key-color",
            "rgb(241, 241, 241)"
        );
        document.documentElement.style.setProperty(
            "--dark-key-color",
            "rgb(228, 228, 228)"
        );
        document.documentElement.style.setProperty(
            "--btn-hover",
            "rgb(188, 188, 188)"
        );
        document.documentElement.style.setProperty(
            "--btn-active",
            "rgb(191, 191, 191)"
        );
        document.documentElement.style.setProperty("--key-hover", "#c8c8c8");
    }
    //green ⇩
    if (themeCounter == 2) {
        document.documentElement.style.setProperty("--background", "#D6EE73");
        document.documentElement.style.setProperty("--line-color", "#D2C250");
        document.documentElement.style.setProperty(
            "--light-key-color",
            "#98D42A"
        );
        document.documentElement.style.setProperty(
            "--dark-key-color",
            "#72D429"
        );
        document.documentElement.style.setProperty("--btn-hover", "#36A533");
        document.documentElement.style.setProperty("--key-hover", "#36A533");
        document.documentElement.style.setProperty("--btn-active", "#2e802c");
        document.documentElement.style.setProperty("--radius-keys", "16px");
        document.documentElement.style.setProperty("--radius-btns", "20px");
        document.documentElement.style.setProperty(
            "--font-family",
            "monospace"
        );
    }
    //blue ⇩
    if (themeCounter == 3) {
        document.documentElement.style.setProperty("--background", "#C0ECFB");
        document.documentElement.style.setProperty(
            "--light-key-color",
            "#73D6F3"
        );
        document.documentElement.style.setProperty(
            "--dark-key-color",
            "#1AC8F2"
        );
        document.documentElement.style.setProperty("--btn-hover", "#006CBF");
        document.documentElement.style.setProperty("--key-hover", "#006DC1");
        document.documentElement.style.setProperty("--btn-active", "#0060a5");
        document.documentElement.style.setProperty("--radius-keys", "15px 0");
        document.documentElement.style.setProperty("--radius-btns", "10px");
        document.documentElement.style.setProperty("--font-family", "cursive");
        document.documentElement.style.setProperty("--font-style", "italic");
    }
    setTimeout(() => {
        document.documentElement.style.setProperty(
            "--transition",
            "color 0.15s, background-color 0.15s"
        );
    }, 600);
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
