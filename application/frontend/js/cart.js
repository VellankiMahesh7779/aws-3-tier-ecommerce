// Flask API
const API_URL = `http://${window.location.hostname}:5000/api`;


// Get cart from localStorage
let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// Cart container
const cartContainer =
    document.getElementById("cart-container");


// Display cart
function displayCart() {

    cartContainer.innerHTML = "";


    // Check if cart is empty
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some products to your cart.
                </p>

                <a href="products.html">
                    Continue Shopping
                </a>

            </div>
        `;

        updateSummary();

        return;
    }


    // Display every product
    cart.forEach((item, index) => {

        const cartItem =
            document.createElement("div");


        cartItem.classList.add(
            "cart-item"
        );


        cartItem.innerHTML = `

            <div class="cart-item-details">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Price:
                    ₹${Number(item.price).toLocaleString("en-IN")}
                </p>


                <div class="quantity-control">

                    <button
                        onclick="decreaseQuantity(${index})">

                        -

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})">

                        +

                    </button>

                </div>


                <p>
                    Item Total:
                    ₹${(
                        Number(item.price) *
                        item.quantity
                    ).toLocaleString("en-IN")}
                </p>

            </div>


            <button
                class="remove-btn"
                onclick="removeItem(${index})">

                Remove

            </button>

        `;


        cartContainer.appendChild(
            cartItem
        );

    });


    updateSummary();
}


// Increase quantity
function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();
}


// Decrease quantity
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    saveCart();
}


// Remove product
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
}


// Save cart
function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// Calculate subtotal and total
function updateSummary() {

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    document.getElementById(
        "cart-subtotal"
    ).textContent =
        subtotal.toLocaleString("en-IN");


    document.getElementById(
        "cart-total"
    ).textContent =
        subtotal.toLocaleString("en-IN");
}


// ========================================
// CHECKOUT
// ========================================

async function checkout() {

    // Check cart
    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;
    }


    // Get logged-in user
    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    // Check login
    if (!user) {

        alert(
            "Please login before checkout."
        );

        window.location.href =
            "login.html";

        return;
    }


    // Convert cart into API format
    const items = cart.map(item => {

        return {
            product_id: item.id,
            quantity: item.quantity
        };

    });


    try {

        // Send order to Flask
        const response =
            await fetch(
                `${API_URL}/orders`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        user_id: user.id,
                        items: items
                    })
                }
            );


        const data =
            await response.json();


        // Handle API error
        if (!response.ok) {

            alert(
                data.message ||
                "Unable to create order."
            );

            return;
        }


        // Clear cart
        localStorage.removeItem("cart");

        cart = [];


        alert(
            `Order placed successfully!\nOrder ID: ${data.order_id}`
        );


        // Go to orders page
        window.location.href =
            "orders.html";


    } catch (error) {

        console.error(
            "Checkout error:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

    }
}


// Connect checkout button
const checkoutButton =
    document.getElementById("checkout-btn");


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        checkout
    );

}


// Load cart when page opens
displayCart();