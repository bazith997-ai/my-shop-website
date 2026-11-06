
// ========================================
// MINIATURE WORLD - COMPLETE STORE SYSTEM
// ========================================

// ========================================
// 1. SHOP CONFIGURATION
// ========================================

// Replace this with your WhatsApp business number.
// Include country code. Example: 919876543210

const SHOP_WHATSAPP_NUMBER = "91XXXXXXXXXX";


// ========================================
// 2. PRODUCT DATABASE
// ========================================

// These are demonstration products.
// Update product names, prices and images
// with your actual inventory before launch.

const products = [

    {
        id: 1,
        name: "Mini Sports Car",
        category: "Sports Cars",
        price: 299,
        image: "https://placehold.co/500x350/222225/e5a928?text=Mini+Sports+Car"
    },

    {
        id: 2,
        name: "Mini Supercar",
        category: "Supercars",
        price: 399,
        image: "https://placehold.co/500x350/222225/e5a928?text=Mini+Supercar"
    },

    {
        id: 3,
        name: "Die Cast Racing Car",
        category: "Die-Cast Cars",
        price: 249,
        image: "https://placehold.co/500x350/222225/e5a928?text=Racing+Car"
    },

    {
        id: 4,
        name: "Mini Toy Car",
        category: "Mini Toys",
        price: 199,
        image: "https://placehold.co/500x350/222225/e5a928?text=Toy+Car"
    },

    {
        id: 5,
        name: "Classic Die Cast Car",
        category: "Die-Cast Cars",
        price: 349,
        image: "https://placehold.co/500x350/222225/e5a928?text=Classic+Car"
    },

    {
        id: 6,
        name: "Mini Luxury Car",
        category: "Supercars",
        price: 499,
        image: "https://placehold.co/500x350/222225/e5a928?text=Luxury+Car"
    },

    {
        id: 7,
        name: "Mini Racing Model",
        category: "Sports Cars",
        price: 299,
        image: "https://placehold.co/500x350/222225/e5a928?text=Racing+Model"
    },

    {
        id: 8,
        name: "Mini Toy Collection",
        category: "Mini Toys",
        price: 199,
        image: "https://placehold.co/500x350/222225/e5a928?text=Toy+Collection"
    }

];


// ========================================
// 3. SHOPPING CART
// ========================================

let cart = [];


// ========================================
// 4. DISPLAY PRODUCTS
// ========================================

function displayProducts() {

    const container = document.getElementById("product-list");

    const searchInput = document.getElementById("product-search");

    const categoryFilter = document.getElementById("category-filter");

    const noProducts = document.getElementById("no-products");

    if (!container) return;

    const searchText = searchInput.value.toLowerCase().trim();

    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    container.innerHTML = filteredProducts.map(product => `

        <div class="product-card">

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>${product.name}</h3>

                <p class="price">
                    ₹${product.price}
                </p>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    ADD TO CART
                </button>

            </div>

        </div>

    `).join("");

    noProducts.hidden = filteredProducts.length !== 0;

}


// ========================================
// 5. ADD TO CART
// ========================================

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1

        });

    }

    updateCart();

}


// ========================================
// 6. CHANGE PRODUCT QUANTITY
// ========================================

function changeQuantity(id, change) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(id);

    } else {

        updateCart();

    }

}


// ========================================
// 7. REMOVE PRODUCT
// ========================================

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();

}


// ========================================
// 8. UPDATE SHOPPING CART
// ========================================

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartCount || !cartTotal) return;

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = totalQuantity;

    cartTotal.textContent = "₹" + totalAmount;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-message">
                Your cart is empty.
            </p>
        `;

        return;

    }

    cartItems.innerHTML = cart.map(item => `

        <div class="cart-item">

            <div>
                <p class="cart-item-name">
                    ${item.name}
                </p>

                <p class="cart-item-price">
                    ₹${item.price * item.quantity}
                </p>
            </div>

            <div class="quantity-controls">

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                    aria-label="Decrease quantity"
                >−</button>

                <span>${item.quantity}</span>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                    aria-label="Increase quantity"
                >+</button>

            </div>

            <button
                class="remove-button"
                onclick="removeFromCart(${item.id})"
            >
                Remove
            </button>

        </div>

    `).join("");

}


// ========================================
// 9. WHATSAPP ORDER CHECKOUT
// ========================================

function placeOrder() {

    // Check cart

    if (cart.length === 0) {

        alert("Your shopping cart is empty. Please add products first.");

        return;

    }

    // Get customer information

    const customerName =
        document.getElementById("customer-name").value.trim();

    const customerPhone =
        document.getElementById("customer-phone").value.trim();

    const customerAddress =
        document.getElementById("customer-address").value.trim();


    // Validate customer information

    if (!customerName || !customerPhone || !customerAddress) {

        alert("Please complete all delivery details.");

        return;

    }

    const cleanPhone = customerPhone.replace(/\D/g, "");

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {

        alert("Please enter a valid 10-digit Indian mobile number.");

        return;

    }


    // Check WhatsApp configuration

    if (!/^91\d{10}$/.test(SHOP_WHATSAPP_NUMBER)) {

        alert("Shop WhatsApp number is not configured yet.");

        return;

    }


    // Prepare order details

    let orderDetails = "";

    cart.forEach((item, index) => {

        orderDetails +=
            `${index + 1}. ${item.name}\n` +
            `   Quantity: ${item.quantity}\n` +
            `   Price: ₹${item.price * item.quantity}\n\n`;

    });


    // Calculate final total

    const totalAmount = cart.reduce(

        (sum, item) => sum + item.price * item.quantity,

        0

    );


    // Prepare WhatsApp message

    const message =

        `🛒 NEW ORDER - MINIATURE WORLD\n\n` +

        `Customer Name: ${customerName}\n` +

        `Mobile Number: ${customerPhone}\n\n` +

        `Delivery Address:\n${customerAddress}\n\n` +

        `ORDER DETAILS:\n\n${orderDetails}` +

        `TOTAL AMOUNT: ₹${totalAmount}\n\n` +

        `Please confirm my order. Thank you!`;


    // Open WhatsApp

    const whatsappURL =

        "https://wa.me/" +

        SHOP_WHATSAPP_NUMBER +

        "?text=" +

        encodeURIComponent(message);


    window.open(whatsappURL, "_blank");

}


// ========================================
// 10. SEARCH AND CATEGORY FILTER
// ========================================

document.getElementById("product-search")
    .addEventListener("input", displayProducts);

document.getElementById("category-filter")
    .addEventListener("change", displayProducts);


// ========================================
// 11. INITIALIZE WEBSITE
// ========================================

displayProducts();

updateCart();
