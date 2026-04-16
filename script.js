document.addEventListener("DOMContentLoaded", () => {

  const searchbox = document.querySelector(".searchbox");
  const btn = document.querySelector(".btn");
  const Listofdish = document.querySelector(".Listofdish");
  const IngredentList = document.querySelector(".IngredentList");

  const modal = new bootstrap.Modal(document.getElementById("recipeModal"));

  // LOAD DEFAULT
  const loadDefaultMeals = async () => {
    Listofdish.innerHTML = "Loading...";

    let meals = [];

    for (let i = 0; i < 6; i++) {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await res.json();
      meals.push(data.meals[0]);
    }

    renderMeals(meals);
  };

  // SEARCH
  const getMeals = async (query) => {
    Listofdish.innerHTML = "Searching...";

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    if (!data.meals) {
      Listofdish.innerHTML = "No results 😢";
      return;
    }

    renderMeals(data.meals);
  };

  // RENDER
  const renderMeals = (meals) => {
    Listofdish.innerHTML = "";

    meals.forEach(meal => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

      col.innerHTML = `
        <div class="card bg-secondary text-white h-100">
          <img src="${meal.strMealThumb}" class="card-img-top">
          <div class="card-body d-flex flex-column">
            <h6 class="MealName">${meal.strMeal}</h6>
            <p class="mb-1">${meal.strArea}</p>
            <p>${meal.strCategory}</p>
            <button class="btn btn-info mt-auto">View Recipe</button>
          </div>
        </div>
      `;

      col.querySelector("button").addEventListener("click", () => {
        showRecipe(meal);
      });

      Listofdish.appendChild(col);
    });
  };

  // SHOW RECIPE
  const showRecipe = (meal) => {
    IngredentList.innerHTML = `
      <h4>${meal.strMeal}</h4>
      <h5>Ingredients</h5>
      <ul>${getIngredients(meal)}</ul>
      <h5>Instructions</h5>
      <p>${meal.strInstructions}</p>
      <a href="${meal.strYoutube}" target="_blank">▶ Watch Video</a>
    `;

    modal.show();
  };

  // INGREDIENTS
  const getIngredients = (meal) => {
    let list = "";

    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      if (!ing) break;

      const measure = meal[`strMeasure${i}`];
      list += `<li>${measure} ${ing}</li>`;
    }

    return list;
  };

  // SEARCH
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const query = searchbox.value.trim();

    if (!query) {
      loadDefaultMeals();
      return;
    }

    getMeals(query);
  });

  loadDefaultMeals();
});