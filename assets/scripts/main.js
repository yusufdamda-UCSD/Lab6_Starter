// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	// A9. TODO - Complete the functionality as described in this function
	let recipes = localStorage.getItem('recipes');

	if (!recipes) {
		return [];
	}

	return JSON.parse(recipes);
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10
	let main = document.querySelector('main');

	// A11
	for (let recipe of recipes) {
		let recipeCard = document.createElement('recipe-card');
		recipeCard.data = recipe;
		main.append(recipeCard);
	}
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. TODO - Complete the functionality as described in this function
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2
	let form = document.querySelector('form');

	// B3
	form.addEventListener('submit', (event) => {

		event.preventDefault();

		// B4
		let formData = new FormData(form);

		// B5
		let recipeObject = {};

		for (let pair of formData.entries()) {
			recipeObject[pair[0]] = pair[1];
		}

		// B6
		let recipeCard = document.createElement('recipe-card');

		// B7
		recipeCard.data = recipeObject;

		// B8
		document.querySelector('main').append(recipeCard);

		// B9
		let recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);
	});

	// B10
	let clearButton = document.querySelector('.danger');

	// B11
	clearButton.addEventListener('click', () => {

		// B12
		localStorage.clear();

		// B13
		document.querySelector('main').innerHTML = '';
	});
}
