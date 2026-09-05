const API_URL = "http://localhost:5000/api/products";

const featuredProducts = document.getElementById("featured-products");


async function loadFeaturedProducts() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();

        // Show only first 3 products on homepage
        const featured = products.slice(0, 3);

        displayFeaturedProducts(featured);

    } catch (error) {

        console.error("Error loading products:", error);

        featuredProducts.innerHTML = `
            <p>Unable to load featured products.</p>
        `;
    }
}


function displayFeaturedProducts(products) {

    featuredProducts.innerHTML = "";

    products.forEach(product => {

        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

        productCard.innerHTML = `
            
            <div class="product-image">
                ${product.name}
            </div>

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <h4>₹${Number(product.price).toLocaleString("en-IN")}</h4>

            <a href="product-details.html?id=${product.id}" class="btn">
                View Product
            </a>

        `;

        featuredProducts.appendChild(productCard);
    });
}


loadFeaturedProducts();