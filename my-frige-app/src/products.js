const fs = require('fs');
import inquirer from 'inquirer';
const productsFilePath = './data/products.json';

// Load
function loadProducts() {
    if (!fs.existsSync(productsFilePath)) return [];
    const data = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(data);
}

// Save
function saveProducts(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
}

// Add
async function addProduct() {
    const product = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter product name:' },
        { type: 'number', name: 'quantity', message: 'Enter product quantity:' }
    ]);

    const products = loadProducts();
    const exists = products.some(p => p.name.toLowerCase() === product.name.toLowerCase());

    if (exists) {
        console.log('Product already exists.');
    } else {
        products.push(product);
        saveProducts(products);
        console.log('Product added successfully.');
    }
}

// Remove
async function removeProduct() {

}

// List
function listProducts() {

}

// Update
async function updateProduct() {
    const products = loadProducts();


}

// module.exports = { addProduct, removeProduct, listProducts, updateProduct };
