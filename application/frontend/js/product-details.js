// Product data
const products = [

    {
        id: 1,
        name: "Premium Laptop",
        price: 50000,
        description: "High-performance laptop for work and entertainment."
    },

    {
        id: 2,
        name: "Smartphone",
        price: 25000,
        description: "Powerful smartphone with excellent performance."
    },

    {
        id: 3,
        name: "Wireless Headphones",
        price: 3000,
        description: "Enjoy high-quality sound with wireless headphones."
    },

    {
        id: 4,
        name: "Smart Watch",
        price: 5000,
        description: "Track your fitness and stay connected."
    },

    {
        id: 5,
        name: "Mechanical Keyboard",
        price: 4500,
        description: "Mechanical keyboard for developers and gamers."
    },

    {
        id: 6,
        name: "Wireless Mouse",
        price: 1500,
        description: "Comfortable wireless mouse for everyday use."
    }

];


// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);

const productId = Number(urlParams.get("id"));


// Find product
const product = products.find(
    product => product.id === productId
);


// Get container
const productDetails =
    document.getElementById("productDetails");


// Check if product exists
if (!product) {

    productDetails.innerHTML = `
        <h2>Product not found</h2>

        <a href="products.html" class="btn">
            Back to Products
        </a>
    `;

} else {

    productDetails.innerHTML = `

        <div class="product-detail-card">

            <div class="product-detail-image">
                ${product.name}
            </div>

            <div class="product-detail-info">

                <h1>
                    ${product.name}
                </h1>

                <p>
                    ${product.description}
                </p>

                <h2>
                    ₹${product.price.toLocaleString("en-IN")}
                </h2>


                <div class="quantity">

                    <label for="quantity">
                        Quantity:
                    </label>

                    <input
                        type="number"
                        id="quantity"
                        value="1"
                        min="1"
                        max="10"
                    >

                </div>


                <button
                    class="btn"
                    onclick="addToCart()"
                >
                    Add to Cart
                </button>


                <a
                    href="products.html"
                    class="btn"
                >
                    Back to Products
                </a>

            </div>

        </div>

    `;
}


// Add product to cart
function addToCart() {

    const quantity =
        Number(
            document.getElementById("quantity").value
        );

    if (quantity < 1) {

        alert("Please select a valid quantity.");

        return;
    }


    // Get existing cart
    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    // Check if product already exists
    const existingProduct =
        cart.find(
            item => item.id === product.id
        );


    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            quantity: quantity

        });

    }


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        `${product.name} added to cart!`
    );

}
