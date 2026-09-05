// Flask API
const API_URL = "http://localhost:5000/api";


// Get orders container
const ordersContainer =
    document.getElementById("orders-container");


// Store orders loaded from backend
let orders = [];


// ========================================
// LOAD ORDERS FROM BACKEND
// ========================================

async function loadOrders() {

    // Get logged-in user
    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    // Check login
    if (!user) {

        ordersContainer.innerHTML = `

            <div class="empty-orders">

                <h2>Please Login</h2>

                <p>
                    Please login to view your orders.
                </p>

                <a href="login.html">
                    Login
                </a>

            </div>

        `;

        return;
    }


    try {

        // Get orders from Flask
        const response =
            await fetch(
                `${API_URL}/orders/${user.id}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load orders"
            );

        }


        // Convert response to JSON
        orders =
            await response.json();


        // Display orders
        displayOrders();


    } catch (error) {

        console.error(
            "Error loading orders:",
            error
        );


        ordersContainer.innerHTML = `

            <div class="empty-orders">

                <h2>
                    Unable to load orders
                </h2>

                <p>
                    Please try again later.
                </p>

            </div>

        `;

    }

}


// ========================================
// DISPLAY ORDERS
// ========================================

function displayOrders() {

    ordersContainer.innerHTML = "";


    // No orders
    if (orders.length === 0) {

        ordersContainer.innerHTML = `

            <div class="empty-orders">

                <h2>
                    No Orders Found
                </h2>

                <p>
                    You have not placed any orders yet.
                </p>

                <a href="products.html">
                    Start Shopping
                </a>

            </div>

        `;

        return;
    }


    // Display each order
    orders.forEach(order => {

        const orderElement =
            document.createElement("div");


        orderElement.classList.add(
            "order-card"
        );


        // Format date
        const orderDate =
            new Date(order.created_at)
                .toLocaleDateString("en-IN");


        // Product HTML
        let productsHTML = "";


        order.items.forEach(item => {

            const itemTotal =
                Number(item.price) *
                Number(item.quantity);


            productsHTML += `

                <div class="order-product">

                    <span>
                        ${item.name}
                    </span>

                    <span>
                        Qty: ${item.quantity}
                    </span>

                    <span>
                        ₹${itemTotal.toLocaleString("en-IN")}
                    </span>

                </div>

            `;

        });


        // Complete order HTML
        orderElement.innerHTML = `

            <div class="order-header">

                <div>

                    <strong>
                        Order #${order.id}
                    </strong>

                    <p>
                        Date: ${orderDate}
                    </p>

                </div>


                <span class="order-status">
                    ${order.status}
                </span>

            </div>


            <div class="order-products">

                ${productsHTML}

            </div>


            <div class="order-footer">

                <strong>
                    Total:
                    ₹${Number(order.total_amount)
                        .toLocaleString("en-IN")}
                </strong>


                <button
                    onclick="viewOrder(${order.id})">

                    View Order

                </button>

            </div>

        `;


        ordersContainer.appendChild(
            orderElement
        );

    });

}


// ========================================
// VIEW ORDER
// ========================================

function viewOrder(orderId) {

    const order =
        orders.find(
            order => order.id === orderId
        );


    if (!order) {

        alert("Order not found.");

        return;
    }


    let details =
        `Order #${order.id}\n\n`;


    details +=
        `Status: ${order.status}\n`;


    details +=
        `Total: ₹${Number(order.total_amount)
            .toLocaleString("en-IN")}\n\n`;


    details += "Products:\n";


    order.items.forEach(item => {

        details +=
            `${item.name} - Qty: ${item.quantity}\n`;

    });


    alert(details);

}


// ========================================
// START
// ========================================

loadOrders();