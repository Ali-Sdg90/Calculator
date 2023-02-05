const themeBtn = document.getElementById("change-theme");
const localTheme = localStorage.getItem("localTheme");
let themeCounter = 0;

// localStorage.clear();

if (localTheme) themeCounter = Number(localTheme);

changeTheme();
function changeTheme() {
    switch (themeCounter) {
        //black ⇩
        case 0:
            document.getElementById("theme-stylesheet").href =
                "./css/theme-black.css";
            break;
        //white ⇩
        case 1:
            document.getElementById("theme-stylesheet").href =
                "./css/theme-white.css";
            break;
        //green ⇩
        case 2:
            document.getElementById("theme-stylesheet").href =
                "./css/theme-green.css";
            break;
        //blue ⇩
        case 3:
            document.getElementById("theme-stylesheet").href =
                "./css/theme-blue.css";
            break;
    }
    localStorage.setItem("localTheme", themeCounter);
    setTimeout(() => {
        document.documentElement.style.setProperty(
            "--transition",
            "background 0.3s, color 0.3s, border-radius 0.5s, opacity 0.3s"
        );
    }, 300);
}
themeBtn.addEventListener("click", function () {
    if (themeCounter > 2) {
        themeCounter = 0;
        localStorage.setItem("localTheme", 0);
    } else themeCounter++;
    changeTheme();
});
