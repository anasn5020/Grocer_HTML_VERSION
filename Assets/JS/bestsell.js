document.addEventListener("DOMContentLoaded", async () => {
    const desktopContainer = document.querySelector('.BestsellProductsSection');
    const mobileContainer = document.querySelector('.BestsellProductsSectionMV');

    try {
        // Fetch trending products from the API
        const response = await fetch('https://grocer.softwaresystems.us/api/v1/products/trending');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const trendingProducts = await response.json();
        console.log(trendingProducts);

        // Render each trending product
        for (const product of trendingProducts.products) {
            const productId = product.id;
            const productName = product.name;
            const productImage = product.image[0];
            const productPrice = product.price;
            const productUnit = product.unit;
            const originalPrice = product.original_price || productPrice; // Assuming the API might provide original price
            const sold = product.sold_quantity || 20;  // Default value of sold quantity if not provided
            const total = product.total_quantity || 50; // Default total quantity
            const discount = product.discount || 10; // Default discount if not provided
            const soldPercentage = (sold / total) * 100;

            // Create desktop card
            const desktopCard = document.createElement('div');
            desktopCard.classList.add('mt-2');

            desktopCard.innerHTML = `
                <div class="BestSellCard position-relative mb-sm-5 mb-md-2 mb-lg-0">
                    <div class="position-absolute BestSellCardOffTag">
                        <h6>Save ${discount}%</h6>
                    </div>
                    <div class="BestSellCardImage">
                        <a href="/Product-details.html" wire:navigate>
                            <img src="https://grocer.softwaresystems.us/storage/app/public/product/${productImage}"
                                onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" alt="${productName}">
                        </a>
                    </div>
                    <div class="card-body">
                        <p class="BestSellCardName">${product.category || 'Fruits'}</p>
                        <div class="bestSellCardNameAndUnitHeadingMain">
                            <h1 class="h2 BestSellCardHeading">${productName}</h1>
                            <h4>(${productUnit})</h4>
                        </div>
                        <div class="col d-flex justify-content-start">
                            <div>
                                <h1 class="BestSellCardProductby1">By</h1>
                            </div>
                            <div>
                                <h1 class="BestSellCardProductby2">&nbsp;Grocer</h1>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col d-flex">
                                <h1 class="BestSellCardPriceTag align-self-center">${productPrice}$</h1>
                                <h3 class="BestSellCardCrossPriceTag align-self-center">&nbsp;&nbsp;<del>${originalPrice}$</del></h3>
                            </div>
                        </div>
                        <div class="col">
                            <div class="progress BestSellCardProgressMain">
                                <div class="progress-bar BestSellCardProgress" role="progressbar" style="width: ${soldPercentage}%;"
                                    aria-valuenow="${soldPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6 class="progressstatus">Sold: ${sold}/${total}</h6>
                        </div>
                        <div class="col text-center align-self-center mt-2">
                            <button class="btn BestSellCardAddButton py-2 w-100"
                                wire:click.prevent="addToCart('${productId}', '${productName}', '${productImage}', '${productPrice}', @json(product.variations), '${productUnit}')">
                                <i class="bi bi-cart"></i>&nbsp;Add
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Append to desktop container
            desktopContainer.appendChild(desktopCard);

            // Create mobile card
            const mobileCard = document.createElement('div');
            mobileCard.classList.add('col-12', 'mt-2');

            mobileCard.innerHTML = `
                <div class="BestSellCard position-relative mb-sm-5 mb-md-2 mb-lg-0">
                    <div class="position-absolute BestSellCardOffTag">
                        <h6>Save ${discount}%</h6>
                    </div>
                    <div class="BestSellCardImage">
                        <a href="/Product-details.html" wire:navigate>
                            <img src="https://grocer.softwaresystems.us/storage/app/public/product/${productImage}"
                                onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" alt="${productName}">
                        </a>
                    </div>
                    <div class="card-body">
                        <p class="BestSellCardName">${product.category || 'Fruits'}</p>
                        <div class="bestSellCardNameAndUnitHeadingMain">
                            <h1 class="h2 BestSellCardHeading">${productName}</h1>
                            <h4>(${productUnit})</h4>
                        </div>
                        <div class="col d-flex justify-content-start">
                            <div>
                                <h1 class="BestSellCardProductby1">By</h1>
                            </div>
                            <div>
                                <h1 class="BestSellCardProductby2">&nbsp;Grocer</h1>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col d-flex">
                                <h1 class="BestSellCardPriceTag align-self-center">${productPrice}$</h1>
                                <h3 class="BestSellCardCrossPriceTag align-self-center">&nbsp;&nbsp;<del>${originalPrice}$</del></h3>
                            </div>
                        </div>
                        <div class="col">
                            <div class="progress BestSellCardProgressMain">
                                <div class="progress-bar BestSellCardProgress" role="progressbar" style="width: ${soldPercentage}%;"
                                    aria-valuenow="${soldPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6 class="progressstatus">Sold: ${sold}/${total}</h6>
                        </div>
                        <div class="col text-center align-self-center mt-2">
                            <button class="btn BestSellCardAddButton py-2 w-100"
                                wire:click.prevent="addToCart('${productId}', '${productName}', '${productImage}', '${productPrice}', @json(product.variations), '${productUnit}')">
                                <i class="bi bi-cart"></i>&nbsp;Add
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Append to mobile container
            mobileContainer.appendChild(mobileCard);
        }
    } catch (error) {
        console.error("Error fetching trending products:", error);
        desktopContainer.innerHTML = "<p>Failed to load trending products. Please try again later.</p>";
        mobileContainer.innerHTML = "<p>Failed to load trending products. Please try again later.</p>";
    }
});
