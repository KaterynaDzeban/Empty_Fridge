const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();


const productsFile = path.join(__dirname, 'products.json');
const recipesFile = path.join(__dirname, 'recipes.json');

// Load
let products = [];
if (fs.existsSync(productsFile)) {
    products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
}

// Load
let recipes = [];
if (fs.existsSync(recipesFile)) {
    recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));
}

// Save
function saveProducts() {
    fs.writeFileSync(productsFile, JSON.stringify(products), 'utf8');
}

// Save
function saveRecipes() {
    fs.writeFileSync(recipesFile, JSON.stringify(recipes), 'utf8');
}

// Add
function addProduct(name, quantity) {
    const existingProduct = products.find(product => product.name === name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
        console.log(`${name} already exists. Quantity updated to ${existingProduct.quantity}.`);
    } else {
        products.push({ name, quantity });
        console.log(`${name} added with quantity ${quantity}.`);
    }
    saveProducts();
}

function removeProduct(name) {

    saveProducts();
}

function updateProduct(name, newQuantity) {
    const product = products.find(product => product.name === name);
    if (product) {
        product.quantity = newQuantity;
        console.log(`${name} updated to quantity ${newQuantity}.`);
    } else {
        console.log(`${name} not found.`);
    }
    saveProducts();
}

function listProducts() {
    if (products.length === 0) {
        console.log("No products available.");
    } else {
        console.log("Product List:");
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - Quantity: ${product.quantity}`);
        });
    }
}

// Recipe
function listRecipes() {

}

function addRecipe(name, ingredients, instructions, time, difficulty) {
    const newRecipe = { name, ingredients, instructions, time, difficulty };
    recipes.push(newRecipe);
    console.log(`Recipe "${name}" added successfully!`);
    saveRecipes();
}

function findRecipesByProducts(availableProducts) {
    return recipes.filter(recipe =>
        recipe.ingredients.every(ingredient =>
            availableProducts.some(product => product.name === ingredient.name && product.quantity >= ingredient.quantity)
        )
    );
}

// Main
function main() {
    let isRunning = true;

    while (isRunning) {
        console.log("1. Add Product");
        console.log("2. Remove Product");
        console.log("3. Update Product");
        console.log("4. List Products");
        console.log("5. Find Recipes");
        console.log("6. Add Recipe");
        console.log("7. Exit");

        const choice = prompt("Choose an option: ");
        switch (choice) {
            case '1': {
                const name = prompt("Enter product name: ");
                const quantity = parseInt(prompt("Enter quantity: "), 10);
                addProduct(name, quantity);
                break;
            }
            case '2': {
                const removeProd = prompt("Enter the name of the product to remove: ");
                removeProduct(removeProd);
                break;
            }
            case '3': {
                const updateName = prompt("Enter the name of the product to update: ");
                const newQuantity = parseInt(prompt("Enter the new quantity: "), 10);
                updateProduct(updateName, newQuantity);
                break;
            }
            case '4': {
                listProducts();
                break;
            }
            case '5': {
                console.log("Finding recipes based on your available products...");
                const matchingRecipes = findRecipesByProducts(products);
                if (matchingRecipes.length > 0) {
                    console.log("Recipes you can make:");
                    matchingRecipes.forEach(recipe => {
                        console.log(`- ${recipe.name} (Time: ${recipe.time}, Difficulty: ${recipe.difficulty})`);
                    });
                } else {
                    console.log("No recipes match your available products.");
                }
                break;
            }
            case '6': {
                const recipeName = prompt("Enter the recipe name: ");
                const ingredients = [];
                let addMore = true;

                while (addMore) {
                    const ingredientName = prompt("Enter the ingredient name: ");
                    const ingredientQuantity = parseInt(prompt("Enter the ingredient quantity: "), 10);
                    ingredients.push({ name: ingredientName, quantity: ingredientQuantity });
                    addMore = prompt("Add another ingredient? (y/n): ").toLowerCase() === 'y';
                }

                const instructions = prompt("Enter cooking instructions: ");
                const time = prompt("Enter the cooking time (e.g., '10 minutes'): ");
                const difficulty = prompt("Enter the difficulty level (e.g., 'easy', 'medium', 'hard'): ");
                addRecipe(recipeName, ingredients, instructions, time, difficulty);
                break;
            }
            case '7': {
                isRunning = false;
                console.log("Goodbye!");
                break;
            }
            default: {
                console.log("Invalid option, please try again.");
            }
        }
    }
}

main();
