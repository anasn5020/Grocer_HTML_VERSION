document.addEventListener('DOMContentLoaded', () => {
    const promotionsDiv = document.querySelector('.PromotionsDivProducts');

    // Fetch data from API
    fetch('https://grocer.softwaresystems.us/api/v1/products/discounted')
        .then(response => response.json())
        .then(products => {
            renderProducts(products);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function renderProducts(products) {
        // Clear existing content
        promotionsDiv.innerHTML = '';

        products.forEach(product => {
            const { id, name, image, price, discount, rating } = product;

            // Calculate discounted price
            const discountedPrice = price - (price * (discount / 100));

            // Get product image
            const imageUrl = `https://grocer.softwaresystems.us/storage/app/public/product/${image[0]}`;

            // Get product rating (average)
            const productRating = rating[0]?.average || '0.0';

            // Create HTML structure for each product
            const productHTML = `
                <div class="ProtomotionsProducts GridsTargetContent">
                    <div class="ProductsCardSearchANDCategory">
                        <div class="heart">
                            <i class="bi bi-heart"></i>
                        </div>
                        <div class="eye">
                            <a href="/Product-details.html?id=${id}">
                                <i class="bi bi-eye"></i>
                            </a>
                        </div>
                        <div class="CategoryMainCardImage">
                            <a href="/Product-details.html?id=${id}">
                                <img src="${imageUrl}" 
                                     onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" 
                                     class="card_main_image p-2" 
                                     alt="${name}">
                            </a>
                        </div>
                        <div class="card-body">
                            <h1 class="h2 searchcard_heading">${name}</h1>
                            <div class="row d-flex">
                                <div class="col align-self-center">
                                    <h1 class="searchpricetag align-self-center">${discountedPrice.toFixed(2)}$</h1>
                                    <p class="original-price"><del>${price}$</del></p>
                                </div>
                                <div class="col text-center align-self-center">
                                    <button class="searchaddbutton">
                                        <img src="/Assets/Images/SmallIcons/Bag.png" alt="">
                                    </button>
                                </div>
                            </div>
                            <div class="d-flex justify-between items-center gap-1 RatingStars">
                                ${renderRatingStars(productRating)}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Append product card to promotions div
            promotionsDiv.innerHTML += productHTML;
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
