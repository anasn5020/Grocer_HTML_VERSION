document.addEventListener("DOMContentLoaded", async () => {
    const latestProductsContainer = document.getElementById('latestProductsContainer');

    try {
        // Fetch latest products from the API
        const response = await fetch('https://grocer.softwaresystems.us/api/v1/products/latest');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const latestProducts = await response.json();
        console.log(latestProducts);

        // Render each latest product
        for (const product of latestProducts.products) {
            const productId = product.id;
            const productName = product.name;
            const productImage = product.image[0];
            const productPrice = product.price;
            const productUnit = product.unit;
            
            // Rating is an array, and we are interested in the first element (the average rating)
            const averageRating = product.rating.length ? parseFloat(product.rating[0].average) : 0;

            // Calculate the number of filled and empty stars based on the rating
            const filledStars = Math.floor(averageRating); // Full stars
            const halfStar = (averageRating - filledStars) >= 0.5 ? 1 : 0; // If the rating has a half-star
            const emptyStars = 5 - filledStars - halfStar; // Remaining empty stars

            // Create product card
            const productCard = document.createElement('div');
            productCard.classList.add('col-sm-6', 'col-md-6', 'col-lg-3', 'mb-4', 'GridsTargetContent');

            productCard.innerHTML = `
                <div class="ProductsCardSearchANDCategory">
                    <div class="heart">
                        <i class="bi bi-heart"></i>
                    </div>
                    <div class="eye">
                        <a wire:navigate href="/Product-details.html">
                            <i class="bi bi-eye"></i>
                        </a>
                    </div>
                    <div class="CategoryMainCardImage">
                        <a wire:navigate href="/Product-details.html">
                            <img src="https://grocer.softwaresystems.us/storage/app/public/product/${productImage}"
                                 onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" class="card_main_image p-2"
                                 alt="${productName}">
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
                            ${'<span class="fa fa-star checked"></span>'.repeat(filledStars)}
                            ${halfStar ? '<span class="fa fa-star-half-alt checked"></span>' : ''}
                            ${'<span class="fa fa-star unChecked"></span>'.repeat(emptyStars)}
                        </div>
                    </div>
                </div>
            `;

            // Append to the latest products container
            latestProductsContainer.appendChild(productCard);
        }
    } catch (error) {
        console.error("Error fetching latest products:", error);
        latestProductsContainer.innerHTML = "<p>Failed to load latest products. Please try again later.</p>";
    }
});
