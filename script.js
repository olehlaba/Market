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

// Відображає вміст кошика
function showCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = ""; // Очищаємо попередній вміст

    let totalPrice = 0;

    cart.forEach((product) => {
        const li = document.createElement("li");
        li.innerText = `${product.name} (x${product.quantity}) - ${product.price * product.quantity} грн`;
        cartItems.appendChild(li);
        totalPrice += product.price * product.quantity;
    });

    document.getElementById("totalPrice").innerText = totalPrice;
}

// Додаємо обробники подій
document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cartButton");
    const modal = document.getElementById("cartModal");
    const closeBtn = document.getElementsByClassName("close")[0];

    cartButton.onclick = function () {
        showCart();
        modal.style.display = "block";
    };

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    const addToCartButtons = document.getElementsByClassName("add-to-cart");

    for (let button of addToCartButtons) {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            const productPrice = this.getAttribute("data-price");
            addToCart(productName, productPrice);
        });
    }

    document.getElementById("payButton").addEventListener("click", function () {
        const totalPrice = document.getElementById("totalPrice").innerText;

        alert(`Оплата успішна! Сума: ${totalPrice} грн`);
    });

    // Прокручування товарів
    document.getElementById("scrollLeft").onclick = function () {
        const products = document.getElementById("productList");
        products.style.transform = "translateX(0)";
    };

    document.getElementById("scrollRight").onclick = function () {
        const products = document.getElementById("productList");
        products.style.transform = "translateX(-100%)";
    };
});
