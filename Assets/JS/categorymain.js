document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector('.row.mt-3'); // The container where products will be rendered

    try {
        // Fetch all products from the API
        const response = await fetch('https://grocer.softwaresystems.us/api/v1/products/all');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const products = data.products.slice(0, 6); // Fetch first 6 products
        console.log(products);

        // If there are no products
        if (products.length === 0) {
            productGrid.innerHTML = "<p>No products available at the moment. Please check back later.</p>";
            return;
        }

        // Render each product in the HTML structure
        products.forEach(product => {
            const productId = product.id;
            const productName = product.name;
            const productImage = product.image[0];
            const productPrice = product.price;
            const productRating = 4; // Placeholder rating since no actual rating is in the API response

            // Create a new product card element
            const productCard = document.createElement('div');
            productCard.classList.add('col-sm-6', 'col-md-6', 'col-lg-4', 'mb-4', 'GridsTargetContent');
            productCard.innerHTML = `
                <div class="ProductsCardSearchANDCategory">
                    <div class="heart">
                        <i class="bi bi-heart"></i>
                    </div>
                    <div class="eye">
                        <a wire:navigate href="/Product-details.html?product=${productId}">
                            <i class="bi bi-eye"></i>
                        </a>
                    </div>
                    <div class="CategoryMainCardImage">
                        <a wire:navigate href="/Product-details.html?product=${productId}">
                            <img src="https://grocer.softwaresystems.us/storage/app/public/product/${productImage}"
                                 onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" 
                                 class="card_main_image p-2" alt="${productName}">
                        </a>
                    </div>
                    <div class="card-body">
                        <h1 class="h2 searchcard_heading">${productName}</h1>
                        <div class="row d-flex">
                            <div class="col align-self-center">
                                <h1 class="searchpricetag align-self-center">${productPrice}$</h1>
                            </div>
                            <div class="col text-center align-self-center">
                                <button class="searchaddbutton">
                                    <img src="/Assets/Images/SmallIcons/Bag.png" alt="">
                                </button>
                            </div>
                        </div>
                        <div class="d-flex justify-between items-center gap-1 RatingStars">
                            ${renderStars(productRating)}
                        </div>
                    </div>
                </div>
            `;

            // Append product card to the grid
            productGrid.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching product data:", error);
        productGrid.innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
});

// Helper function to render stars based on product rating
function renderStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="fa fa-star ${i <= rating ? 'checked' : 'unChecked'}"></span>`;
    }
    return starsHtml;
}
