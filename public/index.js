console.log("> Entry <");

const BASE_URL = "https://strapi-demo-zc1z.onrender.com"
// const BASE_URL = "http://localhost:1337"

async function fetchProducts() {
    try {
        const response = await fetch(`${BASE_URL}/api/products?populate=*`);
        const data = await response.json();

        const products = data.data;
        const productContainer = document.getElementById('product-container');

        products.forEach(product => {
            // Create a new div for the card
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'col-md-4', 'mb-4', 'm-3', 'h-100');
            cardDiv.style.width = '18rem';

            // Create the image element
            const imgElement = document.createElement('img');
            imgElement.classList.add('card-img-top');
            imgElement.src = BASE_URL + product.image[0]?.url || 'default-image.jpg';
            imgElement.alt = product.image[0]?.name || 'Product image';

            // Create the card body
            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');

            // Create the title
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = product.name || 'No title';

            // Create a string to display the sizes
            const sizes = product.sizes;
            const sizesText = sizes.map(size => size.size).join(', ');
            const sizesParagraph = document.createElement('p');
            sizesParagraph.textContent = `Sizes ${sizesText}`; // Display sizes

            // Calculate and display the price with discount
            const price = product.price || 0;
            const discount = product.discount || 0;
            const discountedPrice = price - (price * (discount / 100));

            const priceDiv = document.createElement('div');

            if (discount > 0) {
                // Create original price element with line-through
                const originalPrice = document.createElement('span');
                originalPrice.classList.add('original-price');
                originalPrice.textContent = `₹${price.toFixed(2)}`;

                // Create discounted price element
                const discountPrice = document.createElement('span');
                discountPrice.classList.add('discount-price');
                discountPrice.textContent = `₹${discountedPrice.toFixed(2)}`;

                // Append both prices
                priceDiv.appendChild(originalPrice);
                priceDiv.appendChild(discountPrice);
            } else {
                // No discount, only show the original price
                const priceText = document.createElement('span');
                priceText.classList.add('discount-price');
                priceText.textContent = `₹${price.toFixed(2)}`;
                priceDiv.appendChild(priceText);
            }

            // Create the button
            const cardButton = document.createElement('a');
            cardButton.href = product.link || '#';
            cardButton.classList.add('btn', 'btn-warning');
            cardButton.textContent = 'Add to cart';

            // Append all elements to the card body
            cardBodyDiv.appendChild(cardTitle);
            cardBodyDiv.appendChild(sizesParagraph);
            cardBodyDiv.appendChild(priceDiv);
            cardBodyDiv.appendChild(cardButton);

            // Append the image and card body to the card div
            cardDiv.appendChild(imgElement);
            cardDiv.appendChild(cardBodyDiv);

            // Append the card to the product container
            productContainer.appendChild(cardDiv);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Fetch products when the page loads
window.onload = fetchProducts;