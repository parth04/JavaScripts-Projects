'use strict';
//Select Elements
let score0Element = document.querySelector('#score--0')
let score1Element = document.getElementById('score--1') //Both querySelector and getElementById are same but getElementById works little faster. 
let btnNew = document.querySelector(".btn--new")
let btnRoll = document.querySelector(".btn--roll")
let btnHold = document.querySelector(".btn--hold")
let diceElement = document.querySelector(".dice")


score0Element.textContent = 0
score1Element.textContent = 0
diceElement.classList.toggle("hidden")

let totalScore = [0, 0]
let currentScore = 0
let activePlayer = 0
let playing = true

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active')
    activePlayer = activePlayer === 0 ? 1 : 0
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active')
}

//Roll dice functionality
btnRoll.addEventListener("click", function () {
    if (playing) {
        //Generating dice value
        const diceValue = Math.trunc(Math.random() * 6) + 1

        //Displaying dice image
        diceElement.classList.remove('hidden')
        diceElement.src = `dice-${diceValue}.png`

        // Check for roll 1
        if (diceValue !== 1) {
            currentScore += diceValue
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            switchPlayer()
        }

    }
})

//Hold button functionality
btnHold.addEventListener("click", function () {
    if (playing) {
        totalScore[activePlayer] += currentScore
        document.querySelector(`#score--${activePlayer}`).textContent = totalScore[activePlayer]
        if (totalScore[activePlayer] >= 100) {
            playing = false
            diceElement.classList.toggle("hidden")
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
            document.querySelector(`.player--${activePlayer}`).classList.add("player--active")
        } else {
            switchPlayer()
        }
    }
})

btnNew.addEventListener("click", function () {
    playing = true
    totalScore = [0, 0]
    score0Element.textContent = 0
    score1Element.textContent = 0
    currentScore = 0
    diceElement.classList.toggle("hidden")
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner")

    if (activePlayer !== 0) {
        switchPlayer()
    }
    document.getElementById(`current--0`).textContent = 0
    document.getElementById(`current--1`).textContent = 0



})