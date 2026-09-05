// Flask API
const API_URL = `http://${window.location.hostname}:5000/api`;


// Get product ID from URL
const urlParams =
    new URLSearchParams(window.location.search);

const productId =
    Number(urlParams.get("id"));


// Get product details container
const productDetails =
    document.getElementById("productDetails");


// Store the product loaded from backend
let product = null;


// ========================================
// LOAD PRODUCT FROM FLASK API
// ========================================

async function loadProduct() {

    try {

        // Check if product ID exists
        if (!productId) {

            showProductNotFound();

            return;
        }


        // Call Flask API
        const response =
            await fetch(
                `${API_URL}/products/${productId}`
            );


        // Product not found
        if (response.status === 404) {

            showProductNotFound();

            return;
        }


        // Other API error
        if (!response.ok) {

            throw new Error(
                "Failed to load product"
            );
        }


        // Convert response to JSON
        product =
            await response.json();


        // Display product
        displayProduct(product);


    } catch (error) {

        console.error(
            "Error loading product:",
            error
        );


        productDetails.innerHTML = `

            <h2>
                Unable to load product
            </h2>

            <a
                href="products.html"
                class="btn"
            >
                Back to Products
            </a>

        `;

    }

}


// ========================================
// DISPLAY PRODUCT
// ========================================

function displayProduct(product) {

    productDetails.innerHTML = `

        <div class="product-detail-card">


            <div class="product-detail-image">

                <img
                    src="images/${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-detail-info">

                <h1>
                    ${product.name}
                </h1>


                <p>
                    ${product.description}
                </p>


                <h2>
                    ₹${Number(product.price).toLocaleString("en-IN")}
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


// ========================================
// PRODUCT NOT FOUND
// ========================================

function showProductNotFound() {

    productDetails.innerHTML = `

        <h2>
            Product not found
        </h2>


        <a
            href="products.html"
            class="btn"
        >
            Back to Products
        </a>

    `;

}


// ========================================
// ADD PRODUCT TO CART
// ========================================

function addToCart() {

    // Make sure product is loaded
    if (!product) {

        alert(
            "Product is not available."
        );

        return;
    }


    // Get quantity
    const quantity =
        Number(
            document.getElementById(
                "quantity"
            ).value
        );


    // Validate quantity
    if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
    ) {

        alert(
            "Please select a quantity between 1 and 10."
        );

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
            item =>
                item.id === product.id
        );


    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(product.price),

            quantity: quantity

        });

    }


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Confirmation
    alert(
        `${product.name} added to cart!`
    );

}


// ========================================
// START APPLICATION
// ========================================

loadProduct();