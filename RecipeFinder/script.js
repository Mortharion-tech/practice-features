document.addEventListener('DOMContentLoaded', function() {
    const ingredientInput = document.getElementById('ingredientInput');
    const addIngredientBtn = document.getElementById('addIngredientBtn');
    const ingredientList = document.getElementById('ingredientList');
    const searchRecipesBtn = document.getElementById('searchRecipesBtn');
    const recipesContainer = document.getElementById('recipes');
    let ingredients = [];

    addIngredientBtn.addEventListener('click', addIngredient);
    ingredientList.addEventListener('click', removeIngredient);
    searchRecipesBtn.addEventListener('click', searchRecipes);

    function addIngredient() {
        const ingredient = ingredientInput.value.trim();
        if (ingredient === '' || ingredients.includes(ingredient)) return;
        ingredients.push(ingredient);

        const li = document.createElement('li');
        li.textContent = ingredient;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        li.appendChild(removeBtn);
        ingredientList.appendChild(li);

        ingredientInput.value = '';
    }

    function removeIngredient(e) {
        if (e.target.tagName === 'BUTTON') {
            const ingredient = e.target.parentElement.textContent.replace('Remove', '').trim();
            ingredients = ingredients.filter(ing => ing !== ingredient);
            e.target.parentElement.remove();
        }
    }

    const loading = document.getElementById('loading');

    async function searchRecipes() {
        if (ingredients.length === 0) return;
        const apiKey = 'YOUR_API_KEY';
        const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&number=10&apiKey=${apiKey}`;
        loading.style.display = 'block';
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            recipesContainer.innerHTML = '';
            data.forEach(recipe => {
                const div = document.createElement('div');
                div.classList.add('recipe');
                const img = document.createElement('img');
                img.src = recipe.image;
                div.appendChild(img);
                const title = document.createElement('h2');
                title.textContent = recipe.title;
                div.appendChild(title);
                const link = document.createElement('a');
                link.href = `https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`;
                link.textContent = 'View Recipe';
                link.target = '_blank';
                div.appendChild(link);
                recipesContainer.appendChild(div);
            });
        } catch (error) {
            recipesContainer.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
            console.error('Error:', error);
        } finally {
            loading.style.display = 'none';
        }
    }    
});