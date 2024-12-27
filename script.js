let cart = [];

// Додає товар у кошик
function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: parseInt(productPrice),
        quantity: 1,
    };

    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }

    updateCartCount();
}

// Оновлює кількість товарів у кошику
function updateCartCount() {
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById("cartCount").innerText = cartCount;
}

// Відкриває нове поп-ап вікно для кошика
function openCartPopup() {
    const cartContent = cart.map(
        (product) =>
            `${product.name} (x${product.quantity}) - ${product.price * product.quantity} грн`
    );

    const totalPrice = cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );

    // Вміст вікна
    const popupContent = `
        <html>
        <head>
            <title>Кошик</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h2 { margin-bottom: 20px; }
                ul { list-style-type: none; padding: 0; }
                li { margin-bottom: 10px; }
                p { font-weight: bold; margin-top: 20px; }
            </style>
        </head>
        <body>
            <h2>Кошик</h2>
            <ul>
                ${cartContent.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            <p>Загальна сума: ${totalPrice} грн</p>
        </body>
        </html>
    `;

   function openCartPopup() {
    console.log("Відкриття поп-ап вікна");
    const cartContent = cart.map(
        (product) =>
            `${product.name} (x${product.quantity}) - ${product.price * product.quantity} грн`
    );

    const totalPrice = cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );

    const popupContent = `
        <html>
        <head>
            <title>Кошик</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h2 { margin-bottom: 20px; }
                ul { list-style-type: none; padding: 0; }
                li { margin-bottom: 10px; }
                p { font-weight: bold; margin-top: 20px; }
            </style>
        </head>
        <body>
            <h2>Кошик</h2>
            <ul>
                ${cartContent.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            <p>Загальна сума: ${totalPrice} грн</p>
        </body>
        </html>
    `;

    const popupWindow = window.open(
        "",
        "cartPopup",
        "width=400,height=400,scrollbars=yes,resizable=no"
    );

    if (!popupWindow) {
        console.error("Поп-ап вікно було заблоковано браузером.");
        alert("Поп-ап вікно заблоковано! Дозвольте поп-апи для цього сайту.");
        return;
    }

    popupWindow.document.open();
    popupWindow.document.write(popupContent);
    popupWindow.document.close();
}


// Додаємо обробники подій
document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cartButton");

    // Відкрити кошик у поп-ап вікні
    cartButton.onclick = function () {
        openCartPopup();
    };

    const addToCartButtons = document.getElementsByClassName("add-to-cart");

    for (let button of addToCartButtons) {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            const productPrice = this.getAttribute("data-price");
            addToCart(productName, productPrice);
        });
    }
});
