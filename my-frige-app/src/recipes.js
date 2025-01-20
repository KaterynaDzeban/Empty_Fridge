const fs = require('fs');
import inquirer from 'inquirer';
const recipesFilePath = './data/recipes.json';
const productsFilePath = './data/products.json';

// Load
function loadRecipes() {

}

// Save
function saveRecipes(recipes) {
    fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2), 'utf-8');
}

// List
function listRecipes() {

}

// Add
async function addRecipe() {
    const ingredients = [];
    let addMoreIngredients = true;

    while (addMoreIngredients) {
        const ingredient = await inquirer.prompt([
            { type: 'input', name: 'name', message: 'Enter ingredient name:' },
            { type: 'number', name: 'quantity', message: 'Enter ingredient quantity:' }
        ]);
        ingredients.push(ingredient);

        const { continueAdding } = await inquirer.prompt([
            { type: 'confirm', name: 'continueAdding', message: 'Add more ingredients?' }
        ]);
        addMoreIngredients = continueAdding;
    }

    const { name, time, difficulty } = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter recipe name:' },
        { type: 'number', name: 'time', message: 'Enter cooking time (minutes):' },
        { type: 'list', name: 'difficulty', message: 'Choose recipe difficulty:', choices: ['Easy', 'Medium', 'Hard'] }
    ]);

    const recipes = loadRecipes();
    recipes.push({ name, ingredients, time, difficulty });
    saveRecipes(recipes);

    console.log('Recipe added successfully.');
}

// Save as favorite
async function saveFavoriteRecipe() {

}

// Filter
async function filterRecipes() {

}

//module.exports = { listRecipes, addRecipe, saveFavoriteRecipe, filterRecipes };
