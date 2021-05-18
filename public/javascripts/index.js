const stepOne = document.querySelector(".one");
const stepTwo = document.querySelector(".two");
const stepThree = document.querySelector(".three");

const nextOne = document.querySelector(".one > button")
const nextTwo = document.querySelector(".two > button")


stepTwo.style.display = "none"
stepThree.style.display = "none"

nextOne.addEventListener("click", evt => {
    evt.preventDefault()
    stepTwo.style.display = null
    stepOne.style.display = "none"
})

nextTwo.addEventListener("click", evt => {
    evt.preventDefault()
    stepTwo.style.display = "none"
    stepThree.style.display = null
})

stepOne.style.display = null

/*---------*/

// let card = document.querySelector(".join");

// card.addEventListener("click", function() {
// card.classList.toggle("flip");
// });