

const body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <Бургер в шапке> -=-=-=-=-=-=-=-=-=-=-
	//if($('.check-nft__slide--body')) event.preventDefault()
	// =-=-=-=-=-=-=-=-=-=- </Бургер в шапке> -=-=-=-=-=-=-=-=-=-=-

})


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let checkNftSlider = new Swiper('.check-nft__slider', {

	spaceBetween: 32,
	slidesPerView: 1,
	centeredSlides: true,
	speed: 5000,

	autoplay: {
		delay: 0,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},

	loop: true,
	loopAdditionalSlides: 2,
	freeMode: true,
	
	breakpoints: {
		550: {
			slidesPerView: 2,
		},
		889: {
			slidesPerView: 2,
			spaceBetween: 52,
		},
		1100: {
			slidesPerView: 3,
			spaceBetween: 52,
		},
		1441: {
			slidesPerView: 4,
			spaceBetween: 52,
		},
	}
});

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize;

function resize() {

	windowSize = window.innerWidth;
	html.style.setProperty('--height-header', header.offsetHeight + 'px');

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(TimelineMax)

/* gsap.to(header, {
	startAt: {
		y: -100,
		opacity: 0,
	},
	y: 0,
	opacity: 1,
	duration: 1,
	scrollTrigger: {
		trigger: header,
	}
}) */

/* function splitText(section, tl) {
	const animSection = document.querySelectorAll('.anim-section');
	animSection.forEach(animSection => {

		const animText = animSection.querySelectorAll('.anim-text');
		
		animText.forEach((animText, index) => {
			
			
		})

	})
} */

//splitText();

let tl = gsap.timeline();
const animSection = document.querySelectorAll('.anim-section');
let animSectionArray = [];

function sortByIndex(arr) {
	if(windowSize < 980) return arr.sort((a, b) => a.mobIndex > b.mobIndex ? 1 : -1); else return arr.sort((a, b) => a.index > b.index ? 1 : -1);
}

animSection.forEach(animSection => {
	
	const animElement = animSection.querySelectorAll('.anim-element');

	let animArray = [];
	animElement.forEach(animElement => {
		const index = Number(animElement.dataset.index),
			  mobIndex = (Number(animElement.dataset.mobIndex)) ? Number(animElement.dataset.mobIndex) : index;
			  
		animArray.push({element: animElement, index: index, mobIndex: mobIndex});
	})

	animArray = sortByIndex(animArray);

	let tl = new TimelineMax();
	tl.pause();

	Array.from(animArray).forEach((animArrayElement, index) => {

		const duration 	= (Number(animArrayElement['element'].dataset.duration)) ? Number(animArrayElement['element'].dataset.duration) : 1,
			  delay 	= (Number(animArrayElement['element'].dataset.delay)) ? Number(animArrayElement['element'].dataset.delay) : 0,
			  stagger 	= (Number(animArrayElement['element'].dataset.stagger)) ? Number(animArrayElement['element'].dataset.stagger) : 0.05;
		
		if(animArrayElement['element'].classList.contains('anim-text')) {
			let arrayText = animArrayElement['element'].textContent.split(" ");
			animArrayElement['element'].innerHTML = '';
			
			for(let index = 0; index < arrayText.length; index++) {

				if(arrayText[index].trim()[0] == '*' && arrayText[index].trim()[1] == '*') {
					arrayText[index] = `<strong class="anim-text-word">${arrayText[index].trim().split('**').join('')} </strong>`;
				} else if(arrayText[index].trim()[0] == '/' && arrayText[index].trim()[1] == 'n') {
					arrayText[index] = `<div style="padding: 3px 0"></div>`;
				} else if(arrayText[index].trim()[0] == '/' && arrayText[index].trim()[1] == 'b' && arrayText[index].trim()[2] == 'r') {
					arrayText[index] = `</br>`;
				} else {
					arrayText[index] = `<span class="anim-text-word">${arrayText[index].trim()} </span>`;
				}
	
				animArrayElement['element'].insertAdjacentHTML('beforeend', arrayText[index])
			}

			tl.to(animArrayElement['element'], {
				opacity: 1,
				duration: duration,
				delay: delay,
				onStart: function() {
					
					gsap.to(animArrayElement['element'].querySelectorAll('.anim-text-word'), {
						y: 0,
						opacity: 1,
						startAt: {
							y: 50,
						},
						duration: duration,
						ease: "back.inOut(1.7)",
						stagger: stagger,
						
					})
				}
			}, (index == 0) ? false : "-=1")

		} else if(animArrayElement['element'].classList.contains('anim-fade-in')) {

			tl.to(animArrayElement['element'], {
				opacity: 1,
				duration: duration,
				delay: delay,
			}, (index == 0) ? false : "-=1");

		} else if(animArrayElement['element'].classList.contains('anim-fade-top')) {
			
			tl.to(animArrayElement['element'], {
				opacity: 1,
				y: 0,
				startAt: {
					y: 50,
				},
				duration: duration,
				delay: delay,
			}, (index == 0) ? false : "-=1");

		} else if(animArrayElement['element'].classList.contains('anim-zoom-bottom')) {
			
			tl.to(animArrayElement['element'], {
				opacity: 1,
				y: 0,
				scale: 1,
				startAt: {
					y: -100,
					scale: 0.9
				},
				duration: duration,
				delay: delay,
			}, (index == 0) ? false : "-=1");

		} else if(animArrayElement['element'].classList.contains('anim-fade-right')) {
			
			tl.to(animArrayElement['element'], {
				opacity: 1,
				y: 0, x: 0,
				startAt: {
					y: 0,
					x: -100,
				},
				duration: duration,
				delay: delay,
			}, (index == 0) ? false : "-=1");

		} else {
			tl.to(animArrayElement['element'], {
				opacity: 1,
				duration: duration,
				delay: delay,
			}, (index == 0) ? false : "-=1");
		}
		
	})

	animSection.style.opacity = 1;
	animSectionArray.push([animSection, tl]);

})

function animScroll() {

	Array.from(animSectionArray).forEach((animArrayElement, index) => {
		const element = animArrayElement[0],
			  elementCoords = element.getBoundingClientRect();

		if(window.innerHeight / 1.5 > elementCoords.top && !element.classList.contains('_animated')) {
			element.classList.add('_animated')
			animArrayElement[1].play();
		}
	})
}

animScroll();


window.addEventListener('scroll', animScroll)

gsap.to(header, {
	opacity: 1,
	duration: 1,
	delay: 0.2
})

/* document.querySelectorAll('.anim-fade-in').forEach(animFadeIn => {
	gsap.to(animFadeIn, {
		opacity: 1,
		duration: (Number(animFadeIn.dataset.duration)) ? Number(animFadeIn.dataset.duration) : 1.5,
		delay: Number(animFadeIn.dataset.delay),
		scrollTrigger: {
			trigger: animFadeIn.closest('.anim-section'),
			//toggleActions: 'restart reverse play none'
		},
		
	})
})

document.querySelectorAll('.anim-fade-top').forEach(animFadeTop => {
	gsap.to(animFadeTop, {
		startAt: {
			y: 50,
		},
		y: 0,
		opacity: 1,
		duration: (Number(animFadeTop.dataset.duration)) ? Number(animFadeTop.dataset.duration) : 1.5,
		delay: Number(animFadeTop.dataset.delay),
		scrollTrigger: {
			trigger: animFadeTop.closest('.anim-section'),
			start: 'top 30%',
			markers: true,
			//toggleActions: 'restart reverse play none'
		}
	})
}) */

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=


/*
<div class="timer" data-timer-year="" data-timer-month="" data-timer-day="" data-timer-hour="" data-timer-minute="">
	<span class="timer-days"><span class="timer-days-value"></span></d>
	<span class="timer-hours"><span class="timer-hours-value"></span></span>
	<span class="timer-minutes"><span class="timer-minutes-value"></span></span>
	<span class="timer-seconds"><span class="timer-seconds-value"></span></span>
</div>
*/

function timer() {
	const timerElems = document.querySelectorAll('.timer');

	let deadline;

	timerElems.forEach(thisTimerElem => {

		deadline = new Date(

		thisTimerElem.dataset.timerYear,
		Number(thisTimerElem.dataset.timerMonth - 1),
		thisTimerElem.dataset.timerDay,
		thisTimerElem.dataset.timerHour,
		Number(thisTimerElem.dataset.timerMinute) + 1);

		const day = thisTimerElem.querySelector('.timer-day'),
		hour = thisTimerElem.querySelector('.timer-hour'),
		minute = thisTimerElem.querySelector('.timer-minute');

		const diff = deadline - new Date(),
		days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0,
		hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
		minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;

		if(day) day.textContent = days.toString() + 'd';
		hour.textContent = hours.toString() + 'h';
		minute.textContent = minutes.toString() + 'm';

	});

}

timer();

setInterval(() => {
	timer();
},1000)
