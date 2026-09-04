// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Cart container
const cartContainer = document.getElementById("cart-container");


// Display cart
function displayCart() {

    cartContainer.innerHTML = "";

    // Check if cart is empty
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some products to your cart.</p>

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

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div class="cart-item-details">

                <h3>${item.name}</h3>

                <p>
                    Price: ₹${item.price}
                </p>

                <div class="quantity-control">

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <p>
                    Item Total:
                    ₹${item.price * item.quantity}
                </p>

            </div>


            <button
                class="remove-btn"
                onclick="removeItem(${index})">

                Remove

            </button>

        `;


        cartContainer.appendChild(cartItem);

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

        subtotal += item.price * item.quantity;

    });


    document.getElementById("cart-subtotal").textContent =
        subtotal;


    document.getElementById("cart-total").textContent =
        subtotal;

}


// Checkout
document.getElementById("checkout-btn").addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }


        alert(
            "Checkout functionality will be connected to the backend on Day 3."
        );

    }
);


// Load cart when page opens
displayCart();