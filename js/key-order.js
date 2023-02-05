let orderValues = [];
let currentStyles = "";
changeOrder();

window.addEventListener("resize", changeOrder);

function changeOrder() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width < 1024 || height < 620) {
        orderValues = [
            1, 5, 6, 7, 8, 2, 9, 10, 11, 12, 3, 13, 14, 15, 16, 26, 17, 18, 19,
            20, 4, 21, 22, 23, 24,
        ];
    } else {
        orderValues = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25,
        ];
    }
    const styles = orderValues
        .map((order, index) => {
            return `.key:nth-child(${index + 1}) {
              order: ${order};
            }`;
        })
        .join("\n");

    if (styles !== currentStyles) {
        currentStyles = styles;
        const orderStyle = document.createElement("style");
        orderStyle.innerHTML = styles;
        document.head.appendChild(orderStyle);
    }
}
