// Function to get the product ID from the URL
function getProductID() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');  // Extract 'id' from the query string
}

// Function to fetch product details from the API
async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://grocer.softwaresystems.us/api/v1/products/details/${productId}`);
        const data = await response.json();
        console.log(data);
        renderProductDetails(data);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

// Function to render product details in the HTML
function renderProductDetails(product) {
    const container = document.querySelector('.productdetailsContainer');

    // Update product image
    const productImage = container.querySelector('img');
    productImage.src = `https://grocer.softwaresystems.us/storage/app/public/product/${product.image[0]}`;
    productImage.alt = product.name;

    // Update product name and stock badge
    const productName = container.querySelector('.productNameAndStock h5');
    productName.textContent = product.name;

    const stockBadge = container.querySelector('.badge_stock');
    stockBadge.textContent = product.total_stock > 0 ? 'In Stock' : 'Out of Stock';

    // Update rating and reviews
    const stars = container.querySelectorAll('.ratingStars_productDetails .fa');
    const averageRating = Math.round(product.rating[0]?.average || 0);
    stars.forEach((star, index) => {
        if (index < averageRating) {
            star.classList.add('checked');
        } else {
            star.classList.add('unChecked');
        }
    });

    const reviewsText = container.querySelector('.NoOfstars');
    reviewsText.textContent = `${product.active_reviews.length} Review(s)`;

    // Update SKU and price details
    const sku = container.querySelector('.SKUHeading');
    sku.textContent = `SKU: ${product.id}`;

    const price = container.querySelector('.priceProduct');
    const discountPrice = product.price - (product.price * product.discount / 100);
    price.textContent = `${discountPrice}$`;

    const cutPrice = container.querySelector('.cutprice');
    cutPrice.textContent = `${product.price}$`;

    // Update discount badge
    const discountBadge = container.querySelector('.badgeOff');
    discountBadge.textContent = `${product.discount} % off`;

    // Update description
    const description = container.querySelector('.product_description');
    description.textContent = product.description;

    // Update category
    const category = container.querySelector('.pCategorydesc');
    category.textContent = "Vegetables"; // Based on your provided data

    // Add event listeners to wishlist and cart buttons if needed
    // Implement these features according to your project
}

// Initialize the script by fetching and rendering the product details
document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductID();
    if (productId) {
        fetchProductDetails(productId);
    } else {
        console.error('Product ID not found in URL');
    }
});
