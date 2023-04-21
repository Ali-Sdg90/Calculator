const keyboardKeys = Array.from(document.getElementsByClassName("key"));

document.addEventListener("keyup", function (event) {
    const key = event.key;
    // console.log(key);
    if (
        /^[0-9]$/.test(key) ||
        /^Backspace$/.test(key) ||
        /^Enter$/.test(key) ||
        /^[+=\-*/.]$/.test(key)
    ) {
        let validKey = key;
        if (
            /^(Digit|Numpad)[0-9]$/.test(key) ||
            /^Numpad(Add|Subtract|Multiply|Divide)$/.test(key)
        ) {
            validKey = key.replace(/^(Digit|Numpad)/, "");
        }
        // console.log("->", validKey);

        switch (validKey) {
            case "0":
                keyboardKeys[22].click();
                break;
            case "1":
                keyboardKeys[16].click();
                break;
            case "2":
                keyboardKeys[17].click();
                break;
            case "3":
                keyboardKeys[18].click();
                break;
            case "4":
                keyboardKeys[11].click();
                break;
            case "5":
                keyboardKeys[12].click();
                break;
            case "6":
                keyboardKeys[13].click();
                break;
            case "7":
                keyboardKeys[6].click();
                break;
            case "8":
                keyboardKeys[7].click();
                break;
            case "9":
                keyboardKeys[8].click();
                break;
            case "+":
                keyboardKeys[19].click();
                break;
            case "-":
                keyboardKeys[14].click();
                break;
            case "*":
                keyboardKeys[9].click();
                break;
            case "/":
                keyboardKeys[4].click();
                break;
            case ".":
                keyboardKeys[23].click();
                break;
            case "Backspace":
                keyboardKeys[3].click();
                break;
            case "=":
                keyboardKeys[24].click();
                break;
            case "=":
            case "Enter":
                keyboardKeys[24].click();
                break;
        }
    }
});
