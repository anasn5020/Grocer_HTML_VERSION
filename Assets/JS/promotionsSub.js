document.addEventListener('DOMContentLoaded', () => {
    const promotionsSideProducts = document.querySelector('.promotions_side_products');

    // Fetch data from the API
    fetch('https://grocer.softwaresystems.us/api/v1/products/popular')
        .then(response => response.json())
        .then(data => {
            const products = data.products.slice(0, 4);  // Get only 4 products
            renderPopularProducts(products);
        })
        .catch(error => {
            console.error('Error fetching popular products:', error);
        });

    function renderPopularProducts(products) {
        // Clear existing content
        promotionsSideProducts.innerHTML = '';

        products.forEach(product => {
            const { id, name, image, price, discount, rating } = product;

            // Calculate discounted price
            const discountedPrice = price - (price * (discount / 100));

            // Get product image
            const imageUrl = `https://grocer.softwaresystems.us/storage/app/public/product/${image[0]}`;

            // Get product rating (average)
            const productRating = rating[0]?.average || '0.0';

            // Create the HTML structure for each product
            const productHTML = `
                <div class="mt-2">
                    <div class="mt-3 card_search">
                        <div class="card_searchimg p-3">
                            <a href="/Product-details.html?id=${id}">
                                <img src="${imageUrl}" 
                                     onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" 
                                     class="w-100" 
                                     alt="${name}">
                            </a>
                        </div>
                        <div class="productcardContent p-3">
                            <h1 class="h2 searchcard_heading">${name}</h1>
                            <div class="row mt-2">
                                <div class="col d-flex">
                                    <h1 class="searchcardpricetag align-self-center">
                                        ${discountedPrice.toFixed(2)}$
                                    </h1>
                                    <h3 class="searchcardcrosspricetag align-self-center">
                                        &nbsp;&nbsp;<del>${price}$</del>
                                    </h3>
                                </div>
                                <div class="col text-center align-self-center"></div>
                            </div>
                            <div class="d-flex justify-between items-center gap-1 RatingStars">
                                ${renderRatingStars(productRating)}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Append the product card to the promotions side products div
            promotionsSideProducts.innerHTML += productHTML;
        });
    }

    // Helper function to render star ratings
    function renderRatingStars(rating) {
        let starsHTML = '';
        const roundedRating = Math.round(rating);

        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                starsHTML += '<span class="fa fa-star checked"></span>';
            } else {
                starsHTML += '<span class="fa fa-star unChecked"></span>';
            }
        }
        return starsHTML;
    }
});
