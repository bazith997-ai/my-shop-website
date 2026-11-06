
// MINIATURE WORLD - Store functionality

const products = [
    {
        id: 1,
        name: "Mini Sports Car",
        price: 299,
        image: "https://placehold.co/400x300?text=Sports+Car"
    },
    {
        id: 2,
        name: "Mini Supercar",
        price: 399,
        image: "https://placehold.co/400x300?text=Supercar"
    },
    {
        id: 3,
        name: "Die Cast Racing Car",
        price: 249,
        image: "https://placehold.co/400x300?text=Racing+Car"
    },
    {
        id: 4,
        name: "Mini Toy Car",
        price: 199,
        image: "https://placehold.co/400x300?text=Toy+Car"
    }
];

let cart = [];

function displayProducts() {
    const container = document.getElementById("product-list");

    if (!container) return;

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">₹${product.price}</p>
                <button class="add-cart"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join("");
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function updateCart() {
    const count = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    document.getElementById("cart-count").textContent = count;

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cart-total").textContent =
        "₹" + total;

    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = cart.map(item => `
        <p>
            ${item.name} × ${item.quantity}
            - ₹${item.price * item.quantity}
            <button onclick="removeFromCart(${item.id})">
                Remove
            </button>
        </p>
    `).join("");
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const order = cart.map(item =>
        `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join("\n");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const message =
        `Hello! I would like to place an order:\n\n${order}\n\nTotal: ₹${total}`;

    // Replace with your shop's WhatsApp number.
    const whatsappNumber = "91XXXXXXXXXX";

    window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}

displayProducts();
