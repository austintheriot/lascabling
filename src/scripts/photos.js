gsap.registerPlugin(ScrollTrigger);

const hamburger = document.querySelector('.hamburger');
const hamburgerLines = document.querySelectorAll('.hamburger__line');
const header = document.querySelector('header');
const nav = document.querySelector('nav');

nav.addEventListener('click', closeNavBar);
hamburger.addEventListener('click', hamburgerClickHandler);
window.addEventListener('resize', windowResizeHandler);

/////DISABLE SCROLLING////////
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
	e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
	window.addEventListener(
		'test',
		null,
		Object.defineProperty({}, 'passive', {
			get: function () {
				supportsPassive = true;
			},
		})
	);
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
	'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
	window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
	window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
	window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
	window.addEventListener('keydown', preventDefaultForScrollKeys, false);
	document.querySelector('body').style.overflow = 'hidden';
}

// call this to Enable
function enableScroll() {
	window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
	window.removeEventListener('touchmove', preventDefault, wheelOpt);
	window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
	document.querySelector('body').style.overflow = 'visible';
}

//////////////

let menuOpen = false;
function hamburgerClickHandler() {
	header.classList.toggle('move-in');
	hamburgerLines.forEach((el) =>
		el.classList.toggle('hamburger-transformation')
	);
	hamburgerLines[0].classList.toggle('hamburger-transformation--top');
	hamburgerLines[1].classList.toggle('hamburger-transformation--middle');
	hamburgerLines[2].classList.toggle('hamburger-transformation--bottom');
	if (!menuOpen) {
		disableScroll();
		menuOpen = true;
	} else {
		enableScroll();
		menuOpen = false;
	}
}

function closeNavBar() {
	header.classList.remove('move-in');
	hamburgerLines.forEach((el) =>
		el.classList.remove('hamburger-transformation')
	);
	hamburgerLines[0].classList.remove('hamburger-transformation--top');
	hamburgerLines[1].classList.remove('hamburger-transformation--middle');
	hamburgerLines[2].classList.remove('hamburger-transformation--bottom');
	enableScroll();
}

function windowResizeHandler() {
	if (window.innerWidth > 850) {
		closeNavBar();
	}
}

//slide-in animations
const slideIns = document.querySelectorAll('.slide-in');
slideIns.forEach((el) => {
	gsap.from(el, {
		scrollTrigger: {
			trigger: el,
			toggleActions: 'play none none none',
		},
		ease: 'power.inOut',
		yPercent: 25,
		opacity: 0,
	});
});

//lazy load
const lazyLoad = document.querySelectorAll('[data-src]');
lazyLoad.forEach((el) => {
	gsap.from(el, {
		scrollTrigger: {
			trigger: el,
			start: 'top-=500 bottom', //load 500px BEFORE the picture enters the viewport
			onEnter: lazyLoadOnEnter.bind(this, el),
			id: el.dataset.src, //identify scrolltriggers by their element's data-src attribute
		},
	});
});

function lazyLoadOnEnter(el) {
	el.src = el.dataset.src;
	//release Scrolltrigger for garbage collection
	ScrollTrigger.getById(el.dataset.src).kill();
}
