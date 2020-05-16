const hamburger = document.querySelector('.hamburger');
const hamburgerLines = document.querySelectorAll('.hamburger__line');
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const inputs = document.querySelectorAll('input');

nav.addEventListener('click', closeNavBar);
hamburger.addEventListener('click', hamburgerClickHandler);
window.addEventListener('resize', windowResizeHandler);

function hamburgerClickHandler() {
  header.classList.toggle('move-in');
  hamburgerLines.forEach((el) =>
    el.classList.toggle('hamburger-transformation')
  );
  hamburgerLines[0].classList.toggle('hamburger-transformation--top');
  hamburgerLines[1].classList.toggle('hamburger-transformation--middle');
  hamburgerLines[2].classList.toggle('hamburger-transformation--bottom');
}

function closeNavBar() {
  header.classList.remove('move-in');
  hamburgerLines.forEach((el) =>
    el.classList.remove('hamburger-transformation')
  );
  hamburgerLines[0].classList.remove('hamburger-transformation--top');
  hamburgerLines[1].classList.remove('hamburger-transformation--middle');
  hamburgerLines[2].classList.remove('hamburger-transformation--bottom');
}

function windowResizeHandler() {
  if (window.innerWidth > 850) {
    closeNavBar();
  }
}
