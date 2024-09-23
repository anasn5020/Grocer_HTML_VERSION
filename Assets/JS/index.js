document.addEventListener("DOMContentLoaded", async () => {
    const categoryContainer = document.querySelector('.homecategoryProductsMain');
    const mobileViewContainer = document.querySelector('.MobileViewCategoriesCardOneMainDiv'); // New container

    try {
        // Fetch categories
        const response = await fetch('https://grocer.softwaresystems.us/api/v1/categories');

        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const categories = await response.json();
        console.log(categories);

        // Render categories
        for (const category of categories) {
            const categoryId = category.id;
            const categoryName = category.name;
            const categoryImage = category.image;

            // Create category card
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('mt-sm-5', 'mt-md-5', 'mt-lg-0');

            categoryCard.innerHTML = `
                <a href="/category-product.html" wire:navigate>
                    <div class="CategoryCard text-center border-0" style="background-color: #FEEFEA">
                        <div class="ImageDiv">
                            <img src="https://grocer.softwaresystems.us/storage/app/public/category/${categoryImage}"
                                onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'"
                                class="CategoryCardImage" alt="${categoryName}">
                        </div>
                        <div class="card-body">
                            <h1 class="h2 card_heading">${categoryName}</h1>
                            <p class="card-text card_descri">Loading products...</p>
                        </div>
                    </div>
                </a>
            `;

            // Append to both containers
            categoryContainer.appendChild(categoryCard);
            mobileViewContainer.appendChild(categoryCard.cloneNode(true)); // Clone for mobile view

            // Fetch products for the category
            const productsResponse = await fetch(`https://grocer.softwaresystems.us/api/v1/categories/products/${categoryId}`);

            // Check if the products response is ok
            if (!productsResponse.ok) {
                throw new Error(`HTTP error while fetching products! Status: ${productsResponse.status}`);
            }

            const products = await productsResponse.json();

            // Update the card with product count
            const productCount = products.length;
            categoryCard.querySelector('.card-text').innerText = `${productCount} items`;
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        categoryContainer.innerHTML = "<p>Failed to load categories. Please try again later.</p>";
        mobileViewContainer.innerHTML = "<p>Failed to load categories. Please try again later.</p>"; // Handle mobile view error
    }
});
