document.addEventListener('DOMContentLoaded',()=>{
const searchbox = document.querySelector(".searchbox");
const searchbutton = document.querySelector(".searchbutton");
const Listofdish = document.querySelector(".Listofdish");
const Ingredents = document.querySelector(".Ingredents");
const IngredentList= document.querySelector(".IngredentList");
const closeBtn = document.querySelector(".closeBtn");



const getRecipies =async(query) => {
   Listofdish.innerHTML = "Fetching Recipe...";
   const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   const response = await data.json();
   
       Listofdish.innerHTML =""; 
            response.meals.forEach(meal =>{
             const dishdiv =document.createElement('div');
                   dishdiv.classList.add('dishcard');
                   dishdiv.innerHTML =  `
                      <img src="${meal.strMealThumb}"/>
                      <h3 class="MealName"><span>${meal.strMeal}</span></h3>
                      <p class="MealArea"><span>${meal.strArea}</span></p>
                      <p class="MealCategory">${meal.strCategory} </p> `
                         
                        
                        const button = document.createElement('button');
                        button.textContent= "View Recipe";
                        dishdiv.appendChild(button);
                        button.addEventListener(`click`,()=>{
                                 IngreList(meal);
                        });                    
                        

           
               
                  
                  Listofdish.appendChild(dishdiv);
                        });
                     }
                    

    const IngreList = (meal) =>{
       IngredentList.innerHTML=`
                      <h1 class="FoodName" >${meal.strMeal}</h1>
                      <div class="IngredentContainer">
                      <div class="IngredentSub">
                      <h3 class="Ingredenthead">Ingredent List:-<h3>
                      <ul>${fetchIngredents(meal)}</ul>
                      <div Class="Instruction">
                      <h3 class="InstructionHead"> Instructions:-</h3>
                      <p class="InstuctionDetail">${meal.strInstructions}</p>
                      </div>
                      </div>
                      </div>
                      `
           Ingredents.style.display="block"
         }
 


 const fetchIngredents=(meal)=>{
   let Ilist = "";
   console.log(meal);
   for (i=1;i<=20;i++ ){
    const ingre = meal[`strIngredient${i}`];
    if(ingre){
           const measure = meal[`strMeasure${i}`]; 
           Ilist += `<li>${measure} ${ingre}</li>`
    }else{
       break;
      }
    }
    return Ilist;
    }
    

closeBtn.addEventListener('click', (e) =>{
   e.preventDefault();
     Ingredents.style.display="none"
});

searchbutton.addEventListener ('click', (e) => {
   e.preventDefault();
   const search = searchbox.value  .trim();
   getRecipies(search);
});

})