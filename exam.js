document.addEventListener('DOMContentLoaded', loadProducts);

let products = JSON.parse(localStorage.getItem('products')) || [];

function loadProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear the existing list
    products.forEach(product => addProductToList(product));
}

document.getElementById('product-form').addEventListener('submit', addProduct);

function addProduct(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const price = parseFloat(document.getElementById('price').value);
    const image = document.getElementById('image').value;
    const category = document.getElementById('category').value;

    if (!title || !price || !image || !category) {
        alert('Please fill out all fields!');
        return;
    }

    const newProduct = { id: Date.now(), title, price, image, category };
    products.push(newProduct);
    saveProducts();
    addProductToList(newProduct);

    // Clear the form fields
    document.getElementById('product-form').reset();
}

function addProductToList(product) {
    const productList = document.getElementById('product-list');
    const productItem = document.createElement('li');
    productItem.classList.add('product-item');
    productItem.setAttribute('data-id', product.id);

    productItem.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-info">
            <h4>${product.title}</h4>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Category: ${product.category}</p>
        </div>
        <button class="edit" onclick="editProduct(${product.id})">Edit</button>
        <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
    `;

    productList.appendChild(productItem);
}

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function editProduct(id) {
    const product = products.find(product => product.id === id);
    document.getElementById('title').value = product.title;
    document.getElementById('price').value = product.price;
    document.getElementById('image').value = product.image;
    document.getElementById('category').value = product.category;

    // Remove the product to edit it
    deleteProduct(id);
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    saveProducts();
    loadProducts();
}

function sortProducts() {
    const sortValue = document.getElementById('sort').value;

    if (sortValue === 'asc') {
        products.sort((a, b) => a.price - b.price);
    } else {
        products.sort((a, b) => b.price - a.price);
    }

    saveProducts();
    loadProducts();
}

function searchProduct() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
    loadFilteredProducts(filteredProducts);
}

function filterByCategory() {
    const categoryFilter = document.getElementById('category-filter').value;
    const filteredProducts = categoryFilter ? products.filter(product => product.category === categoryFilter) : products;
    loadFilteredProducts(filteredProducts);
}

function loadFilteredProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    filteredProducts.forEach(product => addProductToList(product));
}
