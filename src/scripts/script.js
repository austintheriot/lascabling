import 'core-js/stable';
import 'regenerator-runtime/runtime';
import API from './config.js';
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

//FORM SUBMISSION/////////
const form = document.getElementsByTagName('form')[0];
const name = document.getElementById('name');
const fake = document.getElementById('number');
const email = document.getElementById('email');
const message = document.getElementById('message');
const button = document.querySelector('.estimate button');
const userMessage = document.getElementById('user-message');

//Error messages
const ERROR_EMAIL_INVALID = 'Please enter a valid email address.';
const ERROR_EMAIL_NONE = 'Please provide an email before submitting.';
const ERROR_NAME_NONE = 'Please provide a name before submitting.';
const ERROR_FAKE_INPUT =
	'Please do not input any text in the phone number input field.';
const ERROR_MESSAGE_TOO_SHORT = 'Please write a longer message. Thank you!';

const disableElements = (disable) => {
	name.disabled = disable;
	fake.disabled = disable;
	email.disabled = disable;
	message.disabled = disable;
	button.disabled = disable;
};

const clearInputs = () => {
	name.value = '';
	fake.value = '';
	email.value = '';
	message.value = '';
};

const inputHasErrors = () => {
	if (fake.value) {
		fake.dataset.invalid = true;
		userMessage.textContent = ERROR_FAKE_INPUT;
		return true;
	} else {
		fake.dataset.invalid = false;
	}
	if (!name.value) {
		name.dataset.invalid = true;
		userMessage.textContent = ERROR_NAME_NONE;
		return true;
	} else {
		name.dataset.invalid = false;
	}

	//Spam filter for message
	let messageArray = message.value ? message.value.trim().split(' ') : [''];
	if (
		message.value &&
		messageArray.length === 1 &&
		messageArray[0] !== 'Hello' &&
		messageArray[0] !== 'Hi' &&
		messageArray[0] !== 'Hey'
	) {
		message.dataset.invalid = true;
		userMessage.textContent = ERROR_MESSAGE_TOO_SHORT;
		return true;
	} else {
		name.dataset.invalid = false;
	}

	if (!email.value) {
		email.dataset.invalid = true;
		userMessage.textContent = ERROR_EMAIL_INVALID;
		return true;
	}
	if (
		!email.value.match(
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
		)
	) {
		email.dataset.invalid = true;
		userMessage.textContent = ERROR_EMAIL_INVALID;
		return true;
	} else {
		email.dataset.invalid = false;
		userMessage.textContent = '';
		return false;
	}
};

const sendSubmission = async () => {
	const response = await fetch(API.endPoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			Name: name.value,
			Email: email.value,
			Message: message.value,
			_private: {
				key: API.key,
			},
		}),
	});
	return response.json();
};

name.addEventListener('change', (e) => {
	if (!e.target.value) {
		name.dataset.invalid = true;
		userMessage.textContent = ERROR_NAME_NONE;
	} else {
		if (userMessage.textContent === ERROR_NAME_NONE) {
			userMessage.textContent = '';
		}
		name.dataset.invalid = false;
	}
});

fake.addEventListener('change', (e) => {
	if (e.target.value) {
		fake.dataset.invalid = true;
		userMessage.textContent = ERROR_FAKE_INPUT;
	} else {
		if (userMessage.textContent === ERROR_FAKE_INPUT) {
			userMessage.textContent = '';
		}
		fake.dataset.invalid = false;
	}
});

email.addEventListener('change', (e) => {
	if (!e.target.value) {
		email.dataset.invalid = true;
		userMessage.textContent = ERROR_EMAIL_NONE;
	} else if (
		!email.value.match(
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
		)
	) {
		email.dataset.invalid = true;
		userMessage.textContent = ERROR_EMAIL_INVALID;
	} else {
		email.dataset.invalid = false;
		if (
			userMessage.textContent === ERROR_EMAIL_INVALID ||
			userMessage.textContent === ERROR_EMAIL_NONE
		) {
			userMessage.textContent = '';
		}
	}
});

message.addEventListener('change', () => {
	//Spam filter for message
	let messageArray = message.value ? message.value.trim().split(' ') : [''];
	console.log(messageArray);
	if (
		message.value &&
		messageArray.length === 1 &&
		messageArray[0].toLowerCase() !== 'hello' &&
		messageArray[0].toLowerCase() !== 'hi' &&
		messageArray[0].toLowerCase() !== 'hey'
	) {
		message.dataset.invalid = true;
		userMessage.textContent = ERROR_MESSAGE_TOO_SHORT;
		return true;
	} else {
		name.dataset.invalid = false;
		if ((userMessage.textContent = ERROR_MESSAGE_TOO_SHORT)) {
			userMessage.textContent = '';
		}
	}
});

const onSubmit = (e) => {
	e.preventDefault();

	//validate user input
	if (inputHasErrors()) {
		return;
	}
	//if no issues, disable inputs and send submission
	disableElements(true);
	userMessage.textContent = 'Sending submission...';
	sendSubmission(e)
		.then((data) => {
			disableElements(false);
			if (data.error) {
				userMessage.textContent =
					'Sorry, there was an error processing your submission. Please try again later.';
			} else {
				console.log(data);
				clearInputs();
				userMessage.textContent = 'Your submission was successfully received!';
			}
		})
		.catch((error) => {
			console.error(error);
			userMessage.textContent =
				'Sorry, there was an error processing your submission. Please try again later.';
		});
};

form.addEventListener('submit', onSubmit);
