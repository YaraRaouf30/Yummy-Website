let searchContainer = document.getElementById("searchContainer")
let boxContainer = document.getElementById("boxContainer")
let rowData = document.getElementById("rowData")


$(document).ready(function(){
    $(".landing").fadeOut(3000)
})

// open & close sideBar nav Function //

$("#toggle").click(function(){
  
    let left= $(".sideBar").css("left")
    if (left == "0px"){
        let widthInner = $ (".navLinks").outerWidth(true)
        $(".sideBar").animate({left: `-${widthInner}px`} , 700)
        $("#toggle").removeClass("fa-solid fa-xmark");
        $("#toggle").addClass("fa-solid fa-bars");
        
    
    }else{
      
        $(".sideBar").animate({left: `0px`} , 700)
      
        $("#toggle").removeClass("fa-solid fa-bars");
        $("#toggle").addClass("fa-solid fa-xmark");
       
        $(".navLinks li").animate({
            top: 0
        }, 700)
       
    }
})

let widthInner = $ (".navLinks").outerWidth(true)
$(".sideBar").animate({left: `-${widthInner}px`})


// getData Function //

let arr = []

async function getData(){
    let res = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let data = await res.json()
    arr = data.meals
    displayMeals(arr)
}

getData(arr)

// displayMeals Function //

function displayMeals(arr) {
    let temp = "";

    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-lg-3 col-md-6 g-4">
                <div onclick="getDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = temp
    boxContainer.innerHTML = ""
    let widthInner = $ (".navLinks").outerWidth(true)
    $(".sideBar").animate({left: `-${widthInner}px`} , 500)
    $("#toggle").removeClass("fa-solid fa-xmark");
    $("#toggle").addClass("fa-solid fa-bars");
}

// getDetails Function //

async function getDetails(mealID) {

    rowData.innerHTML = ""
    
    $("#boxContainer").fadeIn(300)
    $("#boxContainer").addClass("d-flex")

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])

}

// displayMealDetails Function //

function displayMealDetails(meal) {
    
    boxContainer.innerHTML = "";
   

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

  
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


    let temp = `
    <div class="col-lg-4">
                <img class="w-75 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-lg-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                <i class="fa-solid fa-xmark fa-2x position-absolute top-0 end-0 m-4 closeBtn" onclick="displayMeals(arr)"></i>
                
            </div>`

    boxContainer.innerHTML = temp
}

// search Functions //

function showSearchInputs() {
    boxContainer.innerHTML=""
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
    let widthInner = $ (".navLinks").outerWidth(true)
    $(".sideBar").animate({left: `-${widthInner}px`} , 500)
    $("#toggle").removeClass("fa-solid fa-xmark");
    $("#toggle").addClass("fa-solid fa-bars");
}

async function searchByName(letter) {
    rowData.innerHTML = ""
    boxContainer.innerHTML=""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`)
    response = await response.json()

    if(response.meals != []){
        displayMeals(response.meals)
    }else{
        displayMeals([])
    }
}

async function searchByFLetter(letter) {
    rowData.innerHTML = ""
    boxContainer.innerHTML=""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()

    if(response.meals != []){
        displayMeals(response.meals)
    }else{
        displayMeals([])
    }
}


// categories Functions //

async function getCategories() {

    rowData.innerHTML = ""
    searchContainer.innerHTML = "";
    boxContainer.innerHTML=""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    let widthInner = $ (".navLinks").outerWidth(true)
    $(".sideBar").animate({left: `-${widthInner}px`} , 500)
    $("#toggle").removeClass("fa-solid fa-xmark");
    $("#toggle").addClass("fa-solid fa-bars");

}

function displayCategories(arr) {
    let temp = "";

    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-lg-3 col-md-6 my-5">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = temp
}

async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    boxContainer.innerHTML=""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals)
}

// area Functions

async function getArea() {
    rowData.innerHTML = ""
    boxContainer.innerHTML=""
    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
   
    let widthInner = $ (".navLinks").outerWidth(true)
    $(".sideBar").animate({left: `-${widthInner}px`} , 500)
    $("#toggle").removeClass("fa-solid fa-xmark");
    $("#toggle").addClass("fa-solid fa-bars");

    displayArea(respone.meals)
}


function displayArea(arr) {
    let temp = "";

    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-lg-3 col-md-6 mt-5">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center">
                        <i class="fa-solid fa-house-laptop fa-4x cursor-pointer"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = temp
}

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    boxContainer.innerHTML=""
    searchContainer.innerHTML = "";
  
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()

    displayMeals(response.meals)
}


// ingredients Functions //

async function getIngredients() {
    rowData.innerHTML = ""
    boxContainer.innerHTML=""
    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    let widthInner = $ (".navLinks").outerWidth(true)
    $(".sideBar").animate({left: `-${widthInner}px`} , 500)
    $("#toggle").removeClass("fa-solid fa-xmark");
    $("#toggle").addClass("fa-solid fa-bars");

    displayIngredients(respone.meals.slice(0, 20))

}


function displayIngredients(arr) {
    let temp = "";

    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-lg-3 col-md-6">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="ingredients rounded-2 text-center text-white mt-5">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = temp
}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))

}

// contact Functions //
  
function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput")
let ageInput = document.getElementById("ageInput")
let phoneInput = document.getElementById("phoneInput")
let passwordInput = document.getElementById("passwordInput")
let repasswordInput = document.getElementById("repasswordInput")
    nameAlert = document.getElementById("nameAlert")
    emailAlert = document.getElementById("emailAlert")
    phoneAlert = document.getElementById("phoneAlert")
    ageAlert = document.getElementById("ageAlert")
    passwordAlert = document.getElementById("passwordAlert")
    repasswordAlert = document.getElementById("repasswordAlert")
    submitBtn = document.getElementById("submitBtn")


    nameInput.addEventListener("focus", () => {
        nameInputTouched = true
    })

    emailInput.addEventListener("focus", () => {
        emailInputTouched = true
    })

    phoneInput.addEventListener("focus", () => {
        phoneInputTouched = true
    })

    ageInput.addEventListener("focus", () => {
        ageInputTouched = true
    })

    passwordInput.addEventListener("focus", () => {
        passwordInputTouched = true
    })

    repasswordInput.addEventListener("focus", () => {
        repasswordInputTouched = true
    })

    let widthInner = $ (".navLinks").outerWidth(true)
    $(".sideBar").animate({left: `-${widthInner}px`} , 500)
    $("#toggle").removeClass("fa-solid fa-xmark");
    $("#toggle").addClass("fa-solid fa-bars");
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            nameAlert.classList.replace("d-block", "d-none")

        } else {
            nameAlert.classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            emailAlert.classList.replace("d-block", "d-none")
        } else {
            emailAlert.classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            phoneAlert.classList.replace("d-block", "d-none")
        } else {
            phoneAlert.classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            ageAlert.classList.replace("d-block", "d-none")
        } else {
            ageAlert.classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            passwordAlert.classList.replace("d-block", "d-none")
        } else {
            passwordAlert.classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            repasswordAlert.classList.replace("d-block", "d-none")
        } else {
            repasswordAlert.classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(nameInput.value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value))
}

function repasswordValidation() {
    return repasswordInput.value == passwordInput.value
}





