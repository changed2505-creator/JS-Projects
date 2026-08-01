'use strict';

const hider = document.body.querySelectorAll('.hidden');
const showButton = document.body.querySelectorAll('.show-modal');
const closeComp = document.body.querySelector('.close-modal');
const closeOut = document.body.querySelector('.overlay');

showButton.forEach(e => {
  e.addEventListener('click', () => {
    hider.forEach(e => {
      e.classList.remove('hidden');
    });
  });
});

closeComp.addEventListener('click', () => {
  hider.forEach(e => {
    e.classList.add('hidden');
  });
});

closeOut.addEventListener('click', () => {
  hider.forEach(e => {
    e.classList.add('hidden');
  });
});

document.addEventListener('keydown', e => {
  console.log(e.key);
  if (e.key === 'Escape') {
    hider.forEach(e => {
      e.classList.add('hidden');
    });
  }
});
