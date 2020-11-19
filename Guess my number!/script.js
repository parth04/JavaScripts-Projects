'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1
// document.querySelector(".number").textContent = secretNumber

//Functionality of CHECK button
document.querySelector(".check").addEventListener('click', function () {
    const guess = Number(document.querySelector(".guess").value)
    // console.log(guess);
    if (!guess) {
        document.querySelector(".message").textContent = "⛔ No Number"
    }

    //When guess is correct
    else if (guess === secretNumber) {
        document.querySelector("body").style.backgroundColor = "#60b347"
        document.querySelector(".message").textContent = "🎊 Correct Number"
        document.querySelector(".number").textContent = secretNumber
        if (document.querySelector(".score").textContent > document.querySelector(".highscore").textContent) {
            document.querySelector(".highscore").textContent = document.querySelector(".score").textContent
        }


    }
    else if (guess !== secretNumber) {
        if (document.querySelector(".score").textContent > 1) {
            document.querySelector(".message").textContent = guess > secretNumber ? "📈 Too high" : "📈 Too low"
            document.querySelector(".score").textContent -= 1
        } else {
            document.querySelector(".score").textContent -= 1
            document.querySelector(".message").textContent = "💣 You lost the game!"
        }
    }
    // //When guess is too high
    // else if (guess > secretNumber) {
    //     if (document.querySelector(".score").textContent > 1) {
    //         document.querySelector(".message").textContent = "📈 Too High"
    //         document.querySelector(".score").textContent -= 1
    //     } else {
    //         document.querySelector(".score").textContent -= 1
    //         document.querySelector(".message").textContent = "💣 You lost the game!"
    //     }

    // }

    // //When guess is too low
    // else if (guess < secretNumber) {
    //     if (document.querySelector(".score").textContent > 1) {
    //         document.querySelector(".message").textContent = "📉 Too low"
    //         document.querySelector(".score").textContent -= 1
    //     } else {
    //         document.querySelector(".score").textContent -= 1
    //         document.querySelector(".message").textContent = "💣 You lost the game!"
    //     }

    // }
})

//Functionality of AGAIN button
document.querySelector(".again").addEventListener("click", function () {
    secretNumber = Math.trunc(Math.random() * 20) + 1
    document.querySelector("body").style.backgroundColor = "#222"
    document.querySelector(".number").textContent = "?"
    document.querySelector(".message").textContent = "Start guessing..."
    document.querySelector(".score").textContent = 20
    // document.querySelector(".highscore").textContent = 0
})