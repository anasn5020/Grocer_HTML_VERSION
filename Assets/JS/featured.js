document.addEventListener("DOMContentLoaded", async () => {
    const featuredContainer = document.querySelector('.homefeaturedProductsMain');
    const mobileFeaturedContainer = document.querySelector('.MobileViewFeaturedCardMain');

    try {
        // Fetch featured products
        const featuredResponse = await fetch('https://grocer.softwaresystems.us/api/v1/products/featured');
        if (!featuredResponse.ok) {
            throw new Error(`HTTP error! Status: ${featuredResponse.status}`);
        }

        const featuredProducts = await featuredResponse.json();
        console.log(featuredProducts);

        // Render featured products
        for (const product of featuredProducts.products) {
            const productId = product.id;
            const productName = product.name;
            const productImage = product.image[0];
            const productPrice = product.price;
            const productUnit = product.unit;
            const discountedPrice = product.discount; // Assuming this is provided in the API
            const variations = product.variations; // Assuming this is an array

            // Create featured product card for desktop
            const featuredCard = document.createElement('div');
            featuredCard.innerHTML = `
                <div class="FeaturedProductsCard position-relative">
                    <div class="position-absolute BestSellCardOffTag">
                        <h6>Save 10%</h6>
                    </div>
                    <div class="productcardImage text-center">
                        <a href="/Product-details.html" wire:navigate>
                            <img src="https://grocer.softwaresystems.us/storage/app/public/product/${productImage}"
                                 onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'"
                                 class="featuredProductImage" alt="${productName}" loading="lazy">
                        </a>
                    </div>
                    <div class="card-body">
                        <p class="categoryname">Fruits</p>
                        <div class="nameAndUnitHeading">
                            <h1 class="h2 card_heading">${productName}</h1>
                            <h4>(${productUnit})</h4>
                        </div>
                        <livewire:components.rating-stars :rating="${product.rating}" />
                        <div class="col d-flex justify-content-start mt-2">
                            <div>
                                <h1 class="productby1">By</h1>
                            </div>
                            <div>
                                <h1 class="productby2">&nbsp;Grocer</h1>
                            </div>
                        </div>
                        <div class="PriceDivFeaturedProduct mt-2">
                            <div class="d-flex">
                                <h1 class="pricetag align-self-center">${productPrice}$</h1>
                            </div>
                            <div class="text-end align-self-center">
                                <a class="btn addbutton py-2"
                                   wire:click.prevent="addToCart('${productId}', '${productName}', '${productImage}', '${discountedPrice}', @json(variations), '${productUnit}')">
                                    <i class="bi bi-cart"></i>&nbsp;Add
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Append to the desktop featured container
            featuredContainer.appendChild(featuredCard);

            // Create a mobile featured product card (clone the desktop card)
            const mobileFeaturedCard = featuredCard.cloneNode(true);
            mobileFeaturedContainer.appendChild(mobileFeaturedCard);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        featuredContainer.innerHTML = "<p>Failed to load featured products. Please try again later.</p>";
        mobileFeaturedContainer.innerHTML = "<p>Failed to load featured products. Please try again later.</p>";
    }
});
