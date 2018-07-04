//
// Typewrite.js
// Originally written by Simon Shahriveri: https://codepen.io/hi-im-si/pen/DHoup
// Modified by Gooborg Studios © 2018.
// 

// Usage: Add the "typewrite" class to a DOM element to add the typewriter animation to.  Then, add at least the `data-typewrite-text` attribute (the rest are optional).

// DOM Element Attributes:
//  - data-typewrite-text: a string or JSON-formatted list of strings to cycle through.
//  - data-typewrite-period: a number, in milliseconds, indicating how long the text remains on the screen.
//  - data-typewrite-typing-speed: a number, in milliseconds, for how fast to type the characters on screen.
//  - data-typewrite-typing-speed-variance: a number, in milliseconds, on how much to vary the typing speed per character, adding a more realistic touch.
//  - data-typewrite-deleting-speed: a number, in milliseconds, indicating how fast to delete each character.

// Example: <h1 class="typewrite" data-typewrite-text='["We are the gooborgs.", "We will assimilate all."]' data-typewrite-period="2000"></h1>

var TxtType = function(el, strings, period, typingSpeed, typingSpeedVariance, deletingSpeed) {
	if (strings.constructor === Array) this.strings = strings;
	else this.strings = [strings];
	this.el = el;
	this.period = parseInt(period, 10) || 2000;
	this.typingSpeed = parseInt(typingSpeed, 10) || 125;
	this.typingSpeedVariance = parseInt(typingSpeedVariance, 10) || 100;
	this.deletingSpeed = parseInt(deletingSpeed, 10) || 400;
	this.loopNum = 0;
	this.txt = '';
	this.isDeleting = false;
	this.tick();
};

TxtType.prototype.tick = function() {
	var i = this.loopNum % this.strings.length;
	var fullTxt = this.strings[i];

	this.txt = fullTxt.substring(0, this.txt.length + (this.isDeleting ? -1 : 1));
	this.el.innerHTML = this.txt;

	var delta = this.typingSpeed - Math.random() * this.typingSpeedVariance;
	if (this.isDeleting) delta /= 2;

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
		this.el.classList.add("typewrite-blinking-cursor");
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = this.deletingSpeed;
		this.el.classList.remove("typewrite-blinking-cursor");
	}

	var that = this;
	setTimeout(function() {
		that.tick();
	}, delta);
};

window.onload = function() {
	var elements = document.getElementsByClassName('typewrite');
	for (var i=0; i < elements.length; i++) {
		var strings = elements[i].getAttribute('data-typewrite-text');
		var period = elements[i].getAttribute('data-typewrite-period');
		var typingSpeed = elements[i].getAttribute('data-typewrite-typing-speed');
		var typingSpeedVariance = elements[i].getAttribute('data-typewrite-typing-speed-variance');
		var deletingSpeed = elements[i].getAttribute('data-typewrite-deleting-speed');
		if (strings) {
			new TxtType(elements[i], JSON.parse(strings), period, typingSpeed, typingSpeedVariance, deletingSpeed);
		}
	}

	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite:after { \
			content: '|'; \
			opacity: 1; \
		} \
		.typewrite.typewrite-blinking-cursor:after { \
			animation: typewrite-blink .75s step-end infinite; \
		} \
		@keyframes typewrite-blink { \
			from, to { opacity: 0; } \
			50% { opacity: 1; } \
		}";
	document.body.appendChild(css);
};
