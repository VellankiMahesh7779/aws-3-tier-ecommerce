const API_URL = `http://${window.location.hostname}:5000/api`;

const productsContainer =
    document.getElementById("productContainer");

const searchInput =
    document.getElementById("searchInput");

let products = [];


// ========================================
// LOAD PRODUCTS FROM FLASK API
// ========================================

async function loadProducts() {

    try {

        const response =
            await fetch(`${API_URL}/products`);


        if (!response.ok) {

            throw new Error(
                "Failed to load products"
            );

        }


        products =
            await response.json();


        displayProducts(products);


    } catch (error) {

        console.error(
            "Error loading products:",
            error
        );


        productsContainer.innerHTML = `

            <p>
                Unable to load products.
            </p>

        `;

    }

}


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(productList) {

    productsContainer.innerHTML = "";


    if (productList.length === 0) {

        productsContainer.innerHTML = `

            <p>
                No products found.
            </p>

        `;

        return;

    }


    productList.forEach(product => {

        const productCard =
            document.createElement("div");


        productCard.classList.add(
            "product-card"
        );


        productCard.innerHTML = `

            <div class="product-image">

                <img
                    src="images/${product.image}"
                    alt="${product.name}"
                >

            </div>


            <h3>
                ${product.name}
            </h3>


            <p>
                ${product.description}
            </p>


            <h4>
                ₹${Number(product.price).toLocaleString("en-IN")}
            </h4>


            <a
                href="product-details.html?id=${product.id}"
                class="btn"
            >
                View Product
            </a>

        `;


        productsContainer.appendChild(
            productCard
        );

    });

}


// ========================================
// SEARCH PRODUCTS
// ========================================

searchInput.addEventListener(
    "input",
    function () {

        const searchText =
            searchInput.value.toLowerCase();


        const filteredProducts =
            products.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(searchText)

            );


        displayProducts(
            filteredProducts
        );

    }
);


// ========================================
// START APPLICATION
// ========================================

loadProducts();