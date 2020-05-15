hamburger = document.querySelector('.hamburger');
hamburgerLines = document.querySelectorAll('.hamburger__line');
header = document.querySelector('header');
nav = document.querySelector('nav');
inputs = document.querySelectorAll('input');

nav.addEventListener('click', hamburgerClickHandler);
hamburger.addEventListener('click', hamburgerClickHandler);
inputs.forEach((el) => el.addEventListener('change', inputChangeHandler));

function hamburgerClickHandler() {
  header.classList.toggle('move-in');
  hamburgerLines.forEach((el) =>
    el.classList.toggle('hamburger-transformation')
  );
  hamburgerLines[0].classList.toggle('hamburger-transformation--top');
  hamburgerLines[1].classList.toggle('hamburger-transformation--middle');
  hamburgerLines[2].classList.toggle('hamburger-transformation--bottom');
}

function inputChangeHandler() {
  console.log('changed...');
}
