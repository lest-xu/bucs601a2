
// 1. get container
const productsContainer = document.getElementById('products-container');

// 2. get drop zones
const fruitsDropzone = document.getElementById('dpz1');
const vegetablesDropzone = document.getElementById('dpz2');

// 3. set json data file url
const productsJsonUrl = 'https://raw.githubusercontent.com/lest-xu/temp/master/products.json';

// 4. asynchronously fetech the json file form my github 
async function fetchProducts() {
    try {
        const res = await fetch(productsJsonUrl);
        const data = await res.json();
        console.log(data);
        displayProducts(data);
    } catch (error) {
        console.error('Error fetching the products:', error);
    }
}

// 5. display the products
function displayProducts(products) {
    products.forEach(item => {
        const productDiv = createProductElement(item);
        productsContainer.appendChild(productDiv);
    });
}

// 6. drop zones
const zones = [fruitsDropzone, vegetablesDropzone];
zones.forEach(dropzone => {
    // handle dragover event
    dropzone.addEventListener('dragover', (e) => {
        // allow drag over drop zone
        e.preventDefault();
    });

    // handle drop event
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        // console.log(id);
        const productDiv = document.getElementById(id);
        const category = e.target.id === 'dpz1' ? 'fruits' : 'vegetables';
        if (productDiv.getAttribute('data-category') === category) {
            e.target.appendChild(productDiv);
        } else {
            alert(`Wrong category!`);
        }
    });
});

// 7. initialize fetch products
fetchProducts();


/// ****HELPER FUNCTIONS**** ///
function createProductElement(product) {
    // create productDiv html element
    const productDiv = document.createElement('div');
    // set productDiv class for styling
    productDiv.classList.add('product');
    productDiv.setAttribute('draggable', true);
    // set productDiv id
    productDiv.setAttribute('id', `product-${product.id}`);
    // set productDiv category
    productDiv.setAttribute('data-category', product.category);
    // set productDiv background image with size 80px at the bottom
    productDiv.style.backgroundImage = `url(${product.imgUrl})`;
    productDiv.style.backgroundSize = '80px';
    productDiv.style.backgroundRepeat = 'no-repeat';
    productDiv.style.backgroundPosition = 'bottom 10px right 10px';
    // add product details for the productDiv
    productDiv.innerHTML = `
        <p><b>${product.name}</b></p>
        <p>Quantity: ${product.quantity}</p>
        <p class="price">Price: $${product.price}</p>
    `;
    // add dragstart event for productDiv
    productDiv.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
    return productDiv;
}