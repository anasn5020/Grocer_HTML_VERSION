// Fetch popular products using the API
fetch(`https://grocer.softwaresystems.us/api/v1/products/latest`)
    .then(response => response.json())
    .then(data => {
        const productsContainer = document.getElementById('PD_last_2');
        const products = data.products.slice(0, 3); // Take only the first 3 products

        products.forEach(product => {
            // Calculate discount if applicable
            let discount = product.discount_type === 'percent' ? `${product.discount}%` : `${product.discount}$`;
            let discountedPrice = product.price - (product.price * product.discount / 100);
            let originalPrice = product.price;

            // Render each product card
            productsContainer.innerHTML += `
                <div class="lastHomeCardMainDiv mt-3">
                    <div class="homeLastCardTag">
                        <h6>Save ${discount}</h6>
                    </div>
                    <div class="card_img p-1">
                        <a href="/Product-details.html" wire:navigate>
                            <img src="https://grocer.softwaresystems.us/storage/app/public/product/${product.image[0]}"
                                onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" class=""
                                alt="${product.name}" loading="lazy">
                        </a>
                    </div>
                    <div class="lastHomeCardContentMain p-3">
                        <div class="homelastCardNameAndUnitMain">
                            <h1 class="h2 lastcard_heading">${product.name}</h1>
                            <h4>(${product.unit})</h4>
                        </div>
                        <livewire:components.rating-stars :rating="${product.rating[0]?.average || 0}" />
                        <div class="homelastCardPriceAndCartBtn mt-2">
                            <div class="d-flex">
                                <h1 class="LastCardPriceTag align-self-center">${discountedPrice}$</h1>
                                <h3 class="LastCardCrossPriceTag align-self-center">
                                    &nbsp;&nbsp;<del>${originalPrice}$</del></h3>
                            </div>
                            <div class="text-center align-self-center">
                                <button class="LastCardAddButton"
                                    wire:click.prevent="addToCart('${product.id}',  '${product.name}', '${product.image[0]}', '${discountedPrice}', [], '${product.unit}')">
                                    <i class="bi bi-cart"></i>&nbsp;Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    })
    .catch(error => console.error('Error fetching popular products:', error));
