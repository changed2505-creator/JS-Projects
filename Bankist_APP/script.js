'use strict';

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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

//Update the transactions and sort functiality on button click
const addTransaction = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const sTransaction = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  sTransaction.forEach((value, i) => {
    const transactionType = value > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const transcationElement = `<div class="movements__row">
          <div class="movements__type movements__type--${transactionType}">${i + 1} ${transactionType}</div>
          <div class="movements__date">${date.toLocaleDateString('en-GB')}</div>
          <div class="movements__value">${value.toFixed(2)}€</div>
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
  labelBalance.textContent = `${account.balAmt.toFixed(2)}€`;
};

//Display current date and time
const curDate = function () {
  const currd = new Date();
  labelDate.textContent = `${currd.toLocaleDateString('en-GB')} , ${currd.toLocaleTimeString()}`;
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
  labelSumIn.textContent = `${deposit.toFixed(2)}€`;
  labelSumOut.textContent = `${Math.abs(withdrawl).toFixed(2)}€`;
  labelSumInterest.textContent = `${intrestAmount.toFixed(2)}€`;
}

//Updating UI
function updateUI(account) {
  curDate();
  addTransaction(account);
  accountBalance(account);
  accountSummary(account);
}

//Closure/Pointing to current user logged in object
let selectedAccount = null;

selectedAccount = account1;
updateUI(selectedAccount);
containerApp.style.opacity = '100';

////The login functionality
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  selectedAccount = accounts.find(
    account => account.userName === inputLoginUsername.value,
  );
  if (selectedAccount && selectedAccount?.pin === +inputLoginPin.value) {
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
  const amountTransfered = +inputTransferAmount.value;
  if (
    amountTransfered > 0 &&
    transferTo &&
    selectedAccount.balAmt >= amountTransfered &&
    transferTo?.userName !== selectedAccount.userName
  ) {
    selectedAccount.movements.push(-amountTransfered);
    selectedAccount.movementsDates.push(new Date().toISOString());
    transferTo.movements.push(amountTransfered);
    transferTo.movementsDates.push(new Date().toISOString());
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
    selectedAccount?.pin === +inputClosePin.value &&
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
  const loanAmt = Math.round(inputLoanAmount.value);
  if (
    loanAmt > 0 &&
    selectedAccount.movements.some(val => val > 0.1 * loanAmt)
  ) {
    selectedAccount.movements.push(loanAmt);
    selectedAccount.movementsDates.push(new Date().toISOString());
    updateUI(selectedAccount);
  } else {
    alert(
      'We will not be providing you the loan based on the previous transactions🙃',
    );
  }
  inputLoanAmount.value = '';
});

let sorted = false;
// sorting by click event on a button
btnSort.addEventListener('click', e => {
  e.preventDefault();
  addTransaction(selectedAccount, !sorted);
  sorted = !sorted;
});
