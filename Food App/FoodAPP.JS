document.addEventListener('DOMContentLoaded',()=>{
const searchbox = document.querySelector(".searchbox");
const btn = document.querySelector(".btn");
const Listofdish = document.querySelector(".Listofdish");
const Ingredents = document.querySelector(".Ingredents");
const IngredentList= document.querySelector(".IngredentList");
const closebtn = document.querySelector(".closebtn");



const getRecipies =async(query) => {
   Listofdish.innerHTML = "Fetching Recipe...";
   const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   const response = await data.json();
   
       Listofdish.innerHTML =""; 
            response.meals.forEach(meal =>{
             const dishdiv =document.createElement('div');
                   dishdiv.classList.add('dishcard');
                   dishdiv.innerHTML =  `
                      <img class= 'w-100' src="${meal.strMealThumb}"/>
                      <h3 class="MealName text-danger text-center p-0 m-0"><span>${meal.strMeal}</span></h3>
                      <p class="MealArea m-0 p-0"><span>${meal.strArea}</span></p>
                      <p class="MealCategory m-0 p-0">${meal.strCategory} </p> `
                         
                        
                        const button = document.createElement('button');
                        button.textContent= "View Recipe";
                        dishdiv.appendChild(button);
                        button.addEventListener(`click`,()=>{
                                 IngreList(meal);
                        });               data
                         
              

           
               
                  
                  Listofdish.appendChild(dishdiv);
                        });
                     }
                    

    const IngreList = (meal) =>{
       IngredentList.innerHTML=`
                      <h1 class="FoodName w-auto " >${meal.strMeal}</h1>
                      <div class="IngredentContainer ">
                      <div class="IngredentSub">
                      <h3 class="Ingredenthead">Ingredent List:-<h3>
                      <ul class=text-start>${fetchIngredents(meal)}</ul>
                      <div Class="Instruction">
                      <h3 class="InstructionHead"> Instructions:-</h3>
                      <p class="InstuctionDetail">${meal.strInstructions}</p>
                      <p class="Link">Link:-<a href="${meal.strYoutube}" class="">Watch Video</a></p>
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
    

closebtn.addEventListener('click', (e) =>{
   e.preventDefault();
     Ingredents.style.display="none"
});

btn.addEventListener ('click', (e) => {
   e.preventDefault();
   const search = searchbox.value  .trim();
   getRecipies(search);
});

})