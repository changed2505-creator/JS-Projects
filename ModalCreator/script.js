'use strict';

function Model() {
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

  function hideContent() {
    hider.forEach(e => {
      e.classList.add('hidden');
    });
  }

  closeComp.addEventListener('click', hideContent);

  closeOut.addEventListener('click', hideContent);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      hideContent();
    }
  });
}

Model();
