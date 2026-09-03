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


// Get product container
const productContainer =
    document.getElementById("productContainer");


// Display products
function displayProducts(productList) {

    productContainer.innerHTML = "";

    productList.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `

            <div class="product-image">
                ${product.name}
            </div>

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.description}
            </p>

            <h4>
                ₹${product.price.toLocaleString("en-IN")}
            </h4>

            <button
                class="btn"
                onclick="viewProduct(${product.id})"
            >
                View Product
            </button>

        `;

        productContainer.appendChild(productCard);

    });

}


// View product
function viewProduct(productId) {

    window.location.href =
        `product-details.html?id=${productId}`;

}


// Search products
function searchProducts() {

    const searchText =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const filteredProducts =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(searchText)
        );

    displayProducts(filteredProducts);

}


// Search button
document
    .getElementById("searchButton")
    .addEventListener(
        "click",
        searchProducts
    );


// Search while typing
document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        searchProducts
    );


// Initial product display
displayProducts(products);