
// ==========================================
// MINIATURE WORLD - PRODUCT DATABASE
// ==========================================

const products = [
    {
        id: 1,
        name: "Zoomers Blackdog 1:64 Die-Cast Metal Muscle Car",
        price: 149,
        category: "Die-Cast Cars",
        image: "dodge-black.jpg",
        description: "Vintage Racing Scale Model Toy Car - Black"
    }
];

// ==========================================
// WHATSAPP CONFIGURATION
// ==========================================

// Replace with your WhatsApp number.
// India format: 91 followed by your 10-digit mobile number.
// Example: 919876543210

const SHOP_WHATSAPP_NUMBER = "91XXXXXXXXXX";


// ==========================================
// SHOPPING CART
// ==========================================

let cart = [];


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(productList = products) {

    const productContainer = document.getElementById("product-list");
    const noProducts = document.getElementById("no-products");

    if (!productContainer) return;

    productContainer.innerHTML = "";

    if (productList.length === 0) {
        if (noProducts) {
            noProducts.style.display = "block";
        }
        return;
    }

    if (noProducts) {
        noProducts.style.display = "none";
    }

    productList.forEach(product => {

        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
                onerror="this.src='https://placehold.co/400x400/222222/ffffff?text=Image+Unavailable'"
            >

            <div class="product-info">
                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <p class="product-category">
                    ${product.category}
                </p>

                <div class="product-bottom">
                    <span class="product-price">
                        ₹${product.price}
                    </span>

                    <button
                        class="add-to-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        productContainer.appendChild(productCard);

    });
}


// ==========================================
// SEARCH PRODUCTS
// ==========================================

function searchProducts() {

    const searchInput = document.getElementById("product-search");

    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText)
    );

    displayProducts(filteredProducts);
}


// ==========================================
// FILTER PRODUCTS BY CATEGORY
// ==========================================

function filterProducts() {

    const categoryFilter = document.getElementById("category-filter");

    if (!categoryFilter) return;

    const selectedCategory = categoryFilter.value;

    let filteredProducts = products;

    if (selectedCategory !== "All") {

        filteredProducts = products.filter(product =>
            product.category === selectedCategory
        );

    }

    const searchInput = document.getElementById("product-search");

    if (searchInput && searchInput.value.trim() !== "") {

        const searchText = searchInput.value.toLowerCase();

        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText)
        );

    }

    displayProducts(filteredProducts);
}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    alert(product.name + " added to your cart!");
}


// ==========================================
// CHANGE PRODUCT QUANTITY
// ==========================================

function changeQuantity(productId, change) {

    const cartItem = cart.find(item => item.id === productId);

    if (!cartItem) return;

    cartItem.quantity += change;

    if (cartItem.quantity <= 0) {

        removeFromCart(productId);
        return;

    }

    updateCart();
}


// ==========================================
// REMOVE PRODUCT FROM CART
// ==========================================

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    updateCart();
}


// ==========================================
// UPDATE CART DISPLAY
// ==========================================

function updateCart() {

    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartContainer || !cartTotal) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = "<p>Your cart is empty.</p>";

        cartTotal.textContent = "₹0";

        return;
    }

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <div class="cart-controls">

                <button onclick="changeQuantity(${item.id}, -1)">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>

            </div>
        `;

        cartContainer.appendChild(cartItem);

    });

    cartTotal.textContent = "₹" + total;
}


// ==========================================
// WHATSAPP ORDER CHECKOUT
// ==========================================

function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add products first.");

        return;
    }

    if (SHOP_WHATSAPP_NUMBER === "91XXXXXXXXXX") {

        alert("Please configure your shop WhatsApp number in script.js first.");

        return;
    }

    const customerName = document.getElementById("customer-name")?.value.trim();

    const customerPhone = document.getElementById("customer-phone")?.value.trim();

    const customerAddress = document.getElementById("customer-address")?.value.trim();

    if (!customerName || !customerPhone || !customerAddress) {

        alert("Please fill in your name, phone number and address.");

        return;
    }

    if (!/^[6-9]\d{9}$/.test(customerPhone)) {

        alert("Please enter a valid 10-digit Indian mobile number.");

        return;
    }

    let total = 0;

    let message = "Hello Miniature World! I would like to place an order.\n\n";

    message += "CUSTOMER DETAILS\n";
    message += "Name: " + customerName + "\n";
    message += "Phone: " + customerPhone + "\n";
    message += "Address: " + customerAddress + "\n\n";

    message += "ORDER DETAILS\n";

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        message += item.name + "\n";
        message += "Quantity: " + item.quantity + "\n";
        message += "Price: ₹" + itemTotal + "\n\n";

    });

    message += "Total Amount: ₹" + total + "\n\n";

    message += "Please confirm my order. Thank you!";

    const whatsappURL =
        "https://wa.me/" +
        SHOP_WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

}


// ==========================================
// INITIALIZE WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    displayProducts();

    updateCart();

    const searchInput = document.getElementById("product-search");

    const categoryFilter = document.getElementById("category-filter");

    if (searchInput) {
        searchInput.addEventListener("input", searchProducts);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterProducts);
    }

});
