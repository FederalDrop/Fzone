$(function () {
	$('.home__slider').slick({
		dots: true,
		arrows: false,
		autoplay: true,
	});
	$('.inside__slider').slick({
		dots: true,
	});
	$('.partners__slider').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		dots: true,
	});
	$('.med__slider').slick({
		dots: true,
		adaptiveHeight: false,
	});
	$('.effect__slider').slick({
		dots: true,
	});
	$('.about__slider').slick({
		dots: true,
	});
	$('.popular__slider').slick({
		slidesToShow: 3,
		dots: true,
	});
	$('.employer__slider').slick({
		slidesToShow: 3,
		dots: true,
	});

});

window.addEventListener('load', function () {

	let vipad = document.querySelectorAll('.faq-item__plug');
	let down = document.querySelector('.faq-answer__wrappper');
	vipad.forEach(element => {
		element.addEventListener('click', event => {
			let currentelement = document.querySelector('.faq_item_plug down');
			element.classList.toggle('down');
			let answer = element.nextElementSibling;
			if (element.classList.contains('down')) {
				answer.style.maxHeight = answer.scrollHeight + 'px';
				answer.style.opacity = '1';
			}
			else {
				answer.style.maxHeight = 0;
				answer.style.opacity = '0';
			}
		})
	})

	let head = document.querySelectorAll('.body-item__head');
	let body = document.querySelector('.body-item__children');
	head.forEach(element => {
		element.addEventListener('click', event => {
			let currentelement = document.querySelector('.body-item__head down');
			element.classList.toggle('down');
			let answer = element.nextElementSibling;
			if (element.classList.contains('down')) {
				answer.style.display = 'block';
			}
			else {
				answer.style.display = 'none';
			}
		})
	})


}, false);
