'use strict';
function guessGame() {
  let guessNumber = Math.trunc(Math.random() * 20 + 1);
  console.log(guessNumber);
  let highscore = 0;
  let score = 20;
  let messageDisplay = document.body.querySelector('.message');
  let displayScore = document.body.querySelector('.score');
  let displayHighscore = document.body.querySelector('.highscore');
  let secretNumber = document.body.querySelector('.number');
  let checker = document.body.querySelector('.check');

  function again() {
    guessNumber = Math.trunc(Math.random() * 20 + 1);

    checker.disabled = false;
    score = 20;
    messageDisplay.textContent = 'Start guessing...';
    displayScore.textContent = score;
    secretNumber.textContent = '?';
    document.body.style.backgroundColor = '#222';
  }

  checker.addEventListener('click', () => {
    let guess = Number(document.body.querySelector('.guess').value);

    console.log(guess, typeof guess);

    if (!guess) {
      messageDisplay.textContent = 'Enter a no.!';
    } else if (guess < 0 || guess > 20) {
      messageDisplay.textContent = '❌ Enter a no. between 1 and 20...!!!';
    } else if (score > 1) {
      if (guess === guessNumber) {
        messageDisplay.textContent = '🥳 Correct No. !!!';
        if (score > Number(displayHighscore.textContent)) {
          displayHighscore.textContent = score;
        }
        secretNumber.textContent = guess;
        document.body.style.backgroundColor = 'green';
        checker.disabled = true;
      } else if (guess > guessNumber) {
        messageDisplay.textContent = '⭕ Too High !!!';
        score--;
        displayScore.textContent = score;
      } else if (guess < guessNumber) {
        messageDisplay.textContent = '🪫 Too Low !!!';
        score--;
        displayScore.textContent = score;
      }
    } else {
      messageDisplay.textContent = '🚨Turns exhausted.. Try again';
      displayScore.textContent = 0;
      checker.disabled = true;
    }
  });
  document.body.querySelector('.again').addEventListener('click', () => {
    again();
  });
}
guessGame();
