'use strict';

const P1score = document.body.querySelector('#score--0');
const P2score = document.body.querySelector('#score--1');
const P1currentScore = document.body.querySelector('#current--0');
const P2currentScore = document.body.querySelector('#current--1');
const dispDice = document.body.querySelector('.dice');
const diceRoll = document.body.querySelector('.btn--roll');
const p1 = document.body.querySelector('.player--0');
const p2 = document.body.querySelector('.player--1');
const holdScore = document.querySelector('.btn--hold');
const winMessage1 = document.body.querySelector('.name--0');
const newGame = document.body.querySelector('.btn--new');
let playerNo = 0;
let total = 0;
let scores = [0, 0];
let playGame = true;
P1score.textContent = 0;
P2score.textContent = 0;
dispDice.classList.add('hide');

function changePlayer() {
  if (playerNo === 0) {
    p2.classList.add('player--active');
    p1.classList.remove('player--active');
    playerNo = 1;
    P1currentScore.textContent = 0;
    total = 0;
  } else {
    p1.classList.add('player--active');
    p2.classList.remove('player--active');
    playerNo = 0;
    P2currentScore.textContent = 0;
    total = 0;
  }
}

diceRoll.addEventListener('click', () => {
  if (playGame) {
    let roll = Math.trunc(Math.random() * 6 + 1);
    dispDice.classList.remove('hide');
    dispDice.src = `./assets/dice-${roll}.png`;

    if (roll === 1) {
      changePlayer();
    } else {
      if (playerNo === 0) {
        P1currentScore.textContent = `${(total += roll)}`;
      } else {
        P2currentScore.textContent = `${(total += roll)}`;
      }
    }
  }
});

holdScore.addEventListener('click', e => {
  if (playGame) {
    scores[playerNo] += total;
    console.log(scores);
    if (playerNo === 0) {
      P1score.textContent = scores[playerNo];
    } else {
      P2score.textContent = scores[playerNo];
    }

    if (scores[playerNo] >= 10) {
      if (playerNo === 0) {
        p1.classList.add('player--winner');
        p1.classList.remove('player--active');
        playGame = false;
        dispDice.classList.add('hide');
      } else {
        p2.classList.add('player--winner');
        p2.classList.remove('player--active');
        playGame = false;
        dispDice.classList.add('hide');
      }
    } else {
      changePlayer();
    }
  }
});

newGame.addEventListener('click', () => {
  playerNo = 0;
  total = 0;
  scores = [0, 0];
  playGame = true;
  P1score.textContent = 0;
  P2score.textContent = 0;
  dispDice.classList.add('hide');

  P1currentScore.textContent = 0;
  P2currentScore.textContent = 0;
  p1.classList.remove('player--winner');
  p2.classList.remove('player--winner');
  p1.classList.add('player--active');
  p2.classList.remove('player--active');
});
