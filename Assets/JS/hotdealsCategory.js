// categories.js

document.addEventListener("DOMContentLoaded", function() {
    const categoryContainer = document.getElementById('category-container');

    // Fetch categories from API
    fetch('https://grocer.softwaresystems.us/api/v1/categories')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                renderCategories(data);
            } else {
                categoryContainer.innerHTML = '<p>No categories available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
            categoryContainer.innerHTML = '<p>Failed to load categories.</p>';
        });

    // Function to render categories
    function renderCategories(categories) {
        categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'HotDealsCategoryCard';

            const categoryImageDiv = document.createElement('div');
            categoryImageDiv.className = 'category_item_image';

            const categoryLink = document.createElement('a');
            categoryLink.href = '/category-product.html?id=' + category.id;
            categoryLink.setAttribute('wire:navigate', '');

            const categoryImage = document.createElement('img');
            // Construct image URL or fallback to error image
            categoryImage.src = category.image ? 'https://grocer.softwaresystems.us/storage/app/public/category/' + category.image : '/Assets/Images/ERROR/ErrorImage.webp';
            categoryImage.onerror = function() {
                this.src = '/Assets/Images/ERROR/ErrorImage.webp';
            };
            categoryImage.className = 'hot_deals_categories_image';
            categoryImage.alt = category.name;

            const categoryName = document.createElement('h3');
            categoryName.className = 'hot_deals_category_name';
            categoryName.textContent = category.name;

            categoryLink.appendChild(categoryImage);
            categoryImageDiv.appendChild(categoryLink);
            categoryCard.appendChild(categoryImageDiv);
            categoryCard.appendChild(categoryName);

            categoryContainer.appendChild(categoryCard);
        });
    }
});
