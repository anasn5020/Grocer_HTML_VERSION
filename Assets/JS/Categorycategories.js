document.addEventListener("DOMContentLoaded", async () => {
    const categoryContainer = document.querySelector('.CategoryPageShopByCategoryMain');

    try {
        // Fetch categories from the API
        const categoryResponse = await fetch('https://grocer.softwaresystems.us/api/v1/categories');
        if (!categoryResponse.ok) {
            throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
        }

        const categories = await categoryResponse.json();
        console.log(categories);

        // Check if categories exist
        if (categories.length === 0) {
            categoryContainer.innerHTML = "<p>No categories available at the moment. Please check back later.</p>";
            return;
        }

        // Render categories dynamically
        categories.forEach(category => {
            const categoryId = category.id;
            const categoryName = category.name;
            const categoryImage = category.image;
            const totalItems = category.products_count || 0; // Assuming products_count is available in API

            // Create category card
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('CategoryPageCategoryCard');
            categoryCard.innerHTML = `
                <div class="text-center">
                    <div class="departmentcardImageDiv">
                        <a href="/category-product.html?category=${categoryId}" wire:navigate>
                            <img src="https://grocer.softwaresystems.us/storage/app/public/category/${categoryImage}"
                                 onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" 
                                 class="w-100" alt="${categoryName}">
                        </a>
                    </div>
                    <h1 class="department_card_heading">${categoryName}</h1>
                    <p class="department_card_description">(${totalItems} Items)</p>
                </div>
            `;

            // Append category card to the container
            categoryContainer.appendChild(categoryCard);
        });
    } catch (error) {
        console.error("Error fetching category data:", error);
        categoryContainer.innerHTML = "<p>Failed to load categories. Please try again later.</p>";
    }
});
