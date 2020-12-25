'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// THE TRUE BANKING APP

// Data
const account1 = {
  owner: 'Parth Guntoorkar',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Savani Shrotri',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Shivani Birmal',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Himanshu Londhe',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Asavari Deokar',
  movements: [200, 430, 3400, -300, -420, 50],
  interestRate: 1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Displayig all the transactions
const displayTransaction = function (transactions, sort = false) {
  containerMovements.innerHTML = ""
  var d = new Date();
  const todaysDate = d.toDateString()
  labelDate.textContent = `${todaysDate}`

  const movs = sort ? transactions.slice().sort((a, b) => a - b) : transactions

  movs.forEach((element, i) => {
    const type = element > 0 ? "deposit" : "withdrawal"
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <!-- <div class="movements__date">${d}</div> -->
    <div class="movements__value">$${element}</div>
  </div>`
    containerMovements.insertAdjacentHTML("afterbegin", html)
  });

}
// displayTransaction(account1.movements)

//Calculating the whole balance of account
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((accumaletor, element) => accumaletor + element, 0)
  labelBalance.textContent = `$${acc.balance}`
}
// calcPrintBalance(account1.movements)

//Created username for login for each user
const createUserName = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0]).join("")
  });
}
createUserName(accounts)
// console.log(accounts);

//Calculate summary of deposit, withdraw and interest
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `$${income.toFixed(2)}`

  const outcome = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(outcome.toFixed(2))}`

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = `$${interest.toFixed(2)}`
}

//Event Hndlers
let curreentAccount, timer
btnLogin.addEventListener("click", function (e) {
  e.preventDefault() //Prevent form from submitting


  curreentAccount = accounts
    .find(acc => acc.username === inputLoginUsername.value)
  if (curreentAccount ?.pin === Number(inputLoginPin.value)) {
    //Display data of user
    labelWelcome.textContent = `Welcome back ${curreentAccount.owner}`
    containerApp.style.opacity = 100

    //clear the input fields
    inputLoginUsername.value = inputLoginPin.value = ""
    if (timer) {
      clearInterval(timer)
    }
    // timer = startLogoutTimer()
    updateUI(curreentAccount)
  }
  else {
    alert("The username or password is incorrect ❌ ")
  }

})

const updateUI = function (curreentAccount) {
  calcPrintBalance(curreentAccount)
  displayTransaction(curreentAccount.movements)
  calcDisplaySummary(curreentAccount)
}

const startLogoutTimer = function () {
  const tick = function () {
    const minute = Math.trunc(timer / 60)
    const sec = timer % 60
    labelTimer.textContent = `${minute}:${sec}`
    if (timer === 0) {
      clearInterval(logOut)
      labelWelcome.textContent = "Log in to get started"
      containerApp.style.opacity = 0
    }
    timer--

  }
  let timer = 300
  tick()
  const logOut = setInterval(tick, 1000)

  return logOut

}

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault()
  const amount = Number(inputTransferAmount.value)
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value)


  inputTransferTo.value = inputTransferAmount.value = ""


  if (receiverAccount) {
    if (receiverAccount.username === curreentAccount.username) {
      alert("Sorry! You can't send money to yourself.")
    }
    else if (amount > curreentAccount.balance || amount < 0) {
      alert("Your main balance is low.")
    }
    else {
      curreentAccount.movements.push(-amount)
      receiverAccount.movements.push(amount)
      updateUI(curreentAccount)
    }
  }
  else {
    alert("Invalid account to send money. ❌ ")
  }
})


let sorted = false
btnSort.addEventListener("click", function (e) {
  e.preventDefault()
  displayTransaction(curreentAccount.movements, !sorted)
  sorted = !sorted
})


btnClose.addEventListener("click", function (e) {
  e.preventDefault()
  if (curreentAccount.username === inputCloseUsername.value && curreentAccount.pin === Number(inputClosePin.value)) {
    //Delete account of user
    const idx = accounts.findIndex(acc => acc.username === curreentAccount.username)
    accounts.splice(idx, 1)
    //clear the input fields
    inputCloseUsername.value = inputClosePin.value = ""
    // console.log(accounts);
    labelWelcome.textContent = "Log in to get started"
    containerApp.style.opacity = 0
  }
  else {
    alert("The username or password is incorrect ❌ ")
  }

})

btnLoan.addEventListener("click", function (e) {
  e.preventDefault()

  const amount = Math.floor(inputLoanAmount.value)

  if (amount > 0 && curreentAccount.movements.some(mov => mov >= amount * 0.1)) {
    curreentAccount.movements.push(amount);

    updateUI(curreentAccount)
  }
  else {
    alert("Sorry! your credit history is low.")
  }
  inputLoanAmount.value = ""
})



calcDisplaySummary(account1.movements)
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);



/////////////////////////////////////////////////
