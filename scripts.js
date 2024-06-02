document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("index.html")) {
        displayFeaturedProducts();
    } else if (window.location.pathname.endsWith("products.html")) {
        displayProducts();
    } else if (window.location.pathname.endsWith("product.html")) {
        displayProductDetail();
    } else if (window.location.pathname.endsWith("cart.html")) {
        displayCartItems();
    }
});

const products = [
    { id: 1, name: "Product 1", price: 10.00, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: 2, name: "Product 2", price: 20.00, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: 3, name: "Product 3", price: 30.00, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
];

function displayFeaturedProducts() {
    const featuredProducts = document.getElementById("featured-products");
    products.slice(0, 2).forEach(product => {
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <a href="product.html?id=${product.id}">View Details</a>
        `;
        featuredProducts.appendChild(productItem);
    });
}

function displayProducts() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <a href="product.html?id=${product.id}">View Details</a>
        `;
        productList.appendChild(productItem);
    });
}

function displayProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const product = products.find(p => p.id == productId);
    if (product) {
        const productDetail = document.getElementById("product-detail");
        productDetail.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    }
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id == productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";
    if (cart.length > 0) {
        cart.forEach(product => {
            const cartItem = document.createElement("div");
            cartItem.className = "product-item";
            cartItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        const total = cart.reduce((sum, product) => sum + product.price, 0);
        cartTotal.textContent = total.toFixed(2);
    } else {
        cartItemsContainer.innerHTML = "<p>No items in cart</p>";
        cartTotal.textContent = "0.00";
    }
}
