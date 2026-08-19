'use strict';

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// -----------------------------

//Update the transactions
const addTransaction = function (transaction, sort = false) {
  containerMovements.innerHTML = '';
  const sTransaction = sort
    ? transaction.slice().sort((a, b) => a - b)
    : transaction;
  sTransaction.forEach((value, i) => {
    const transactionType = value > 0 ? 'deposit' : 'withdrawal';
    const transcationElement = `<div class="movements__row">
          <div class="movements__type movements__type--${transactionType}">${i + 1} ${transactionType}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${value}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', transcationElement);
  });
};

//Add the owners username
const loginAccount = function (Accounts) {
  Accounts.forEach(Account => {
    Account.userName = Account.owner
      .toLowerCase()
      .split(' ')
      .map(e => e.slice(0, 1))
      .join('');
  });
};
loginAccount(accounts);

//Updates the balance of the accounts
const accountBalance = function (account) {
  labelBalance.innerHTML = '';
  account.balAmt = account.movements.reduce((acc, val) => acc + val, 0);
  labelBalance.textContent = `${account.balAmt}€`;
};

//Updates the Deposit,Withdrawl and Intrest fields
function accountSummary(account) {
  const deposit = account.movements
    .filter(val => val > 0)
    .reduce((acc, val) => acc + val, 0);
  const withdrawl = account.movements
    .filter(val => val < 0)
    .reduce((acc, val) => acc + val, 0);
  const intrestAmount = account.movements
    .filter(val => val > 0)
    .map(val => (val * account.interestRate) / 100)
    .reduce((acc, val) => acc + val, 0);
  labelSumIn.textContent = `${deposit}€`;
  labelSumOut.textContent = `${Math.abs(withdrawl)}€`;
  labelSumInterest.textContent = `${intrestAmount.toFixed(2)}€`;
}

//Updating UI
function updateUI(account) {
  addTransaction(account.movements);
  accountBalance(account);
  accountSummary(account);
}

//Closure/Pointing to current user logged in object
let selectedAccount = null;
let currentAcc = null;

////The login functionality
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  selectedAccount = accounts.find(
    account => account.userName === inputLoginUsername.value,
  );
  if (selectedAccount && selectedAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = '100';
    labelWelcome.textContent = `Welcome ${selectedAccount.owner}`;
    inputLoginUsername.value = inputLoginPin.value = '';
    updateUI(selectedAccount);
  } else {
    alert(`Either username or password is incorrect!!!`);
  }
  inputLoginUsername.value = inputLoginPin.value = '';
});

//Transfer functinality
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const transferTo = accounts.find(
    account => inputTransferTo.value === account.userName,
  );
  const amountTransfered = Number(inputTransferAmount.value);
  if (
    amountTransfered > 0 &&
    transferTo &&
    selectedAccount.balAmt >= amountTransfered &&
    transferTo?.userName !== selectedAccount.userName
  ) {
    selectedAccount.movements.push(-amountTransfered);
    transferTo.movements.push(amountTransfered);
    alert(`Amount transfer successful🥳`);
  } else if (transferTo?.userName === selectedAccount.userName) {
    alert(`Can't transfer to same account🤣`);
  } else {
    alert(`Entered user doesn't exist❌`);
  }
  updateUI(selectedAccount);
  inputTransferAmount.value = inputTransferTo.value = '';
});

// Closing account functionality
btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    selectedAccount?.pin === Number(inputClosePin.value) &&
    selectedAccount?.userName === inputCloseUsername.value
  ) {
    const indexDelete = accounts.findIndex(
      account => account.userName === selectedAccount.userName,
    );
    if (indexDelete !== -1) {
      accounts.splice(indexDelete, 1);
      containerApp.style.opacity = '0';
      inputCloseUsername.value = inputClosePin.value = '';
    }
  } else {
    alert(
      `Either username or password is incorrect. We will not be able to close your account!!!`,
    );
  }
});

// Loan request functionality
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loanAmt = Number(inputLoanAmount.value);
  if (loanAmt > 0 && currentAcc.movements.some(val => val > 0.1 * loanAmt)) {
    selectedAccount.movements.push(loanAmt);
    updateUI(selectedAccount);
  } else {
    alert(
      'We will not be providing you the loan based on the previous transactions🙃',
    );
  }
  inputLoanAmount.value = '';
});

let sorted = false;
// sorting functionaliy
btnSort.addEventListener('click', e => {
  e.preventDefault();
  addTransaction(selectedAccount.movements, !sorted);
  sorted = !sorted;
});
