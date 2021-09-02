document.getElementById('search-button').addEventListener('click', () => {
     const inputFiled = document.getElementById('input-filed');
     const inputText = inputFiled.value;
     inputFiled.value = '';

     if (inputText.length > 0) {
          getInputText(inputText)
     } else {
          const errorMassage = document.getElementById('error-massage');
          errorMassage.innerHTML = ` <p class="text-center bg-danger p-4 text-light w-50 mx-auto ">Please! keep to text in input filed what you are looking</p>`
     }

})

const getInputText = inputText => {
     const url = (`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`);

     fetch(url)
          .then(res => res.json())
          .then(data => displayFood(data.meals))
}

const displayFood = meals => {
     const mealsArea = document.getElementById('meals-area');
     const spinnerLoading = document.getElementById('spinner');
     spinnerLoading.style.display = 'block'
     meals.forEach(meal => {
          // console.log(meal);
          const childMealsbox = document.createElement('div');
          childMealsbox.classList.add('col');
          childMealsbox.innerHTML = `
          <div onclick = "orderDataLoadById('${meal.idMeal}')" class="card">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions .slice(0, 100)}</p>
          </div>
        </div>
          `
          mealsArea.appendChild(childMealsbox);



     })
}

const orderDataLoadById = idCard => {
     const url = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idCard}`)
     fetch(url)
          .then(res => res.json())
          .then(data => displaySingleMeal(data.meals[0]))
}

const displaySingleMeal = meal => {
     // console.log(meal);
     window.scrollTo(0, 40)
     const singleMealArea = document.getElementById('single-meal-area');
     singleMealArea.textContent = '';
     const chlidBoxSingle = document.createElement('div');
     chlidBoxSingle.classList.add('card');
     chlidBoxSingle.innerHTML = ` 
     <div  class="text-center w-50 mx-auto" >
          <img width ="200px" src="${meal.strMealThumb}"  alt="...">
          <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions .slice(0, 30)}</p>
          <button onclick = "orderCount('${meal.idMeal}')"  class="btn btn-primary py-2 px-5">Order</button>
     </div>
     </div>
     
     `
     singleMealArea.appendChild(chlidBoxSingle);
}

let count = 0;
const orderCount = (orderId) => {
     const countText = document.getElementById('count');
     let orderList = countText.innerHTML = ++count;

     const url = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${orderId}`)
     fetch(url)
          // displaySingleMeal(data.meals[0])
          .then(res => res.json())
          .then(data => modalDisplay(data.meals[0]))

}

const modalDisplay = dataModal => {

     const ModalOrder = document.getElementById('modal-order');

     const modalChildModo = document.createElement('div');
     modalChildModo.classList.add('card');

     modalChildModo.innerHTML = `
     <img src="${dataModal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${dataModal.strMeal}</h5>
            
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
     `
     ModalOrder.appendChild(modalChildModo);
}