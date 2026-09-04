// =========================
// SAMPLE ORDERS
// =========================

const orders = [
    {
        id: 1001,
        date: "2026-09-01",
        status: "Delivered",
        total: 53000,

        products: [
            {
                name: "Premium Laptop",
                quantity: 1,
                price: 50000
            },
            {
                name: "Wireless Mouse",
                quantity: 2,
                price: 1500
            }
        ]
    },

    {
        id: 1002,
        date: "2026-09-03",
        status: "Processing",
        total: 3000,

        products: [
            {
                name: "Wireless Headphones",
                quantity: 1,
                price: 3000
            }
        ]
    }
];


// Get orders container
const ordersContainer =
    document.getElementById("orders-container");


// Display orders
function displayOrders() {

    ordersContainer.innerHTML = "";


    // Check if there are no orders
    if (orders.length === 0) {

        ordersContainer.innerHTML = `
            <div class="empty-orders">

                <h2>No Orders Found</h2>

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

        orderElement.classList.add("order-card");


        // Product HTML
        let productsHTML = "";


        order.products.forEach(product => {

            productsHTML += `
                <div class="order-product">

                    <span>
                        ${product.name}
                    </span>

                    <span>
                        Qty: ${product.quantity}
                    </span>

                    <span>
                        ₹${product.price * product.quantity}
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
                        Date: ${order.date}
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
                    Total: ₹${order.total}
                </strong>

                <button
                    onclick="viewOrder(${order.id})">

                    View Order

                </button>

            </div>

        `;


        ordersContainer.appendChild(orderElement);

    });

}


// View order
function viewOrder(orderId) {

    alert(
        "Order details for Order #" +
        orderId +
        " will be connected to the backend on Day 3."
    );

}


// Load orders
displayOrders();