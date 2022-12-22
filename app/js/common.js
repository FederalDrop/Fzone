$(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger').toggleClass('active');
		$('.header-mobile__nav').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.home__slider').slick({
		dots: true,
		arrows: false,
		//asNavFor: '.home-slider__text',
	});
	$('.home-slider__text').slick({
		dots: false,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		asNavFor: '.home__slider',
	});
	$('.inside__slider').slick({
		dots: true,
	});
	$('.partners__slider').slick({
		slidesToShow: 3,
		dots: true,
		responsive: [
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});
	$('.med__slider').slick({
		dots: true,
		adaptiveHeight: false,
	});
	$('.effect__slider').slick({
		dots: true,
	});
	$('.reviews__slider').slick({
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 2,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1125,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: false,
					adaptiveHeight: true,
				}
			},
		]
	});
	$('.about__slider').slick({
		dots: true,
		vertical: true,
	});
	$('.popular__slider').slick({
		slidesToShow: 3,
		dots: true,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});
	$('.employer__slider').slick({
		slidesToShow: 3,
		dots: true,
	});
	$('a[href*="#"]').on('click.smoothscroll', function (e) {
		var hash = this.hash, _hash = hash.replace(/#/, ''), theHref = $(this).attr('href').replace(/#.*/, '');
		if (theHref && location.href.replace(/#.*/, '') != theHref) return;
		var $target = _hash === '' ? $('body') : $(hash + ', a[name="' + _hash + '"]').first();
		if (!$target.length) return;
		e.preventDefault();
		$('html, body').stop().animate({ scrollTop: $target.offset().top - 0 }, 800, 'swing', function () {
			window.location.hash = hash;
		});
	});

});

window.addEventListener('load', function () {

	const onScrollHeader = () => { // объявляем основную функцию onScrollHeader

		const header = document.querySelector('.header') // находим header и записываем в константу

		let prevScroll = window.pageYOffset // узнаем на сколько была прокручена страница ранее
		console.log(prevScroll);
		let currentScroll // на сколько прокручена страница сейчас (пока нет значения)

		window.addEventListener('scroll', () => { // при прокрутке страницы
			currentScroll = window.pageYOffset // узнаем на сколько прокрутили страницу
			const headerHidden = () => header.classList.contains('header_bg') // узнаем скрыт header или нет
			if (currentScroll > prevScroll && !headerHidden()) { // если прокручиваем страницу вниз и header не скрыт
				header.classList.add('header_bg') // то скрываем header
			}
			if (currentScroll < prevScroll && headerHidden()) { // если прокручиваем страницу вверх и header скрыт
				header.classList.remove('header_bg') // то отображаем header
			}
			prevScroll = currentScroll // записываем на сколько прокручена страница на данный момент
		})
	}
	onScrollHeader() // вызываем основную функцию onScrollHeader

	let dots = document.querySelectorAll('.dots-item');
	dots.forEach(element => {
		element.addEventListener('click', event => {
			element.classList.toggle('down');
		})
	})

	let vipad = document.querySelectorAll('.faq-item__plug');
	vipad.forEach(element => {
		element.addEventListener('click', event => {
			let currentelement = document.querySelector('.faq-item__plug.down');
			if (currentelement && currentelement !== element) {
				currentelement.classList.remove('down');
				currentelement.nextElementSibling.style.maxHeight = 0;
				currentelement.nextElementSibling.style.overflow = 'hidden';
			}
			element.classList.toggle('down');
			let answer = element.nextElementSibling;
			if (element.classList.contains('down')) {
				answer.style.maxHeight = answer.scrollHeight + 'px';
				answer.style.opacity = '1';
			}
			else {
				answer.style.maxHeight = 0;
				answer.style.opacity = '0';
				answer.style.overflow = 'hidden';
			}
		})
	})

	function popupAir() {
		const footerElement = document.querySelector('footer');
		if (!footerElement) {
			alert('dont find teg footer')
		}
		else {
			let airElements = document.querySelectorAll('.popup-air');
			if (airElements.length > 0) {
				let airBtnOpen = document.querySelectorAll('.air-open-btn');
				createAirPopups()

				for (let i = 0; i < airBtnOpen.length; i++) {
					airBtnOpen[i].onclick = openAirPopup
				}
			}
			else {
				return
			}

			function createAirPopups() {
				let airConteiner = document.createElement("div");
				airConteiner.classList.add('air-conteiner');

				for (let i = 0; i < airElements.length; i++) {
					let airCloseIcon = document.createElement("div");
					airCloseIcon.classList.add('air-close');
					airElements[i].appendChild(airCloseIcon)
					airConteiner.appendChild(airElements[i])

				}
				footerElement.after(airConteiner)
			}

			function openAirPopup() {
				let currentAirPopupBtn = this.getAttribute('data-popup-current');
				let allPopups = document.querySelectorAll('.popup-air');
				let currentAirPopup = document.querySelector(`.popup-air[data-air="${currentAirPopupBtn}"]`);
				let closeAirIcon = currentAirPopup.querySelector('.air-close');
				closeAllAirPopups(allPopups);
				openAirConteiner();
				currentAirPopup.classList.add('air-popup_active');

				closeAirIcon.addEventListener('click', function () {
					currentAirPopup.classList.remove('air-popup_active');
					closeAirConteiner()
				})
			}

			function openAirConteiner() {
				let airConteier = document.querySelector('.air-conteiner');
				airConteier.classList.add('air-conteiner_active');
			}

			function closeAllAirPopups(allPopups) {
				for (let i = 0; i < allPopups.length; i++) {
					allPopups[i].classList.remove('air-popup_active');
				}
			}
			function closeAirConteiner() {
				let airConteier = document.querySelector('.air-conteiner');
				airConteier.classList.remove('air-conteiner_active');
			}
		}

	}
	popupAir()

	function videoLoad() {
		let videoBtn = document.querySelectorAll('.video-btn');
		for (let i = 0; i < videoBtn.length; i++) {
			videoBtn[i].addEventListener('click', function () {
				let videoUrl = this.getAttribute('data-video-src');
				let closeVideoBtn = document.querySelector('.video-popup').closest('.popup-air').querySelector('.air-close');
				document.querySelector('.video-popup iframe').setAttribute('src', videoUrl)
				closeVideoBtn.addEventListener('click', function () {
					setTimeout(function () {
						document.querySelector('.video-popup iframe').setAttribute('src', '')
					}, 800)
				});
			})
		}
	}
	videoLoad()

	//Подгрузка отзыва во всплывающее окно 
	function loadReview() {
		let review = document.querySelectorAll('.reviews-item');
		for (let i = 0; i < review.length; i++) {
			review[i].querySelector('.reviews-item__more-button').addEventListener('click', function () {
				let name = review[i].querySelector('.reviews-item__name').innerHTML;
				let stars = review[i].querySelector('.reviews-item__stars').innerHTML;
				let title = review[i].querySelector('.reviews-item__title').innerHTML;
				let text = review[i].querySelector('.reviews-item__text').innerHTML;

				document.querySelector('.review-body__name').innerHTML = name;
				document.querySelector('.review-body__stars').innerHTML = stars;
				document.querySelector('.review-body__title').innerHTML = title;
				document.querySelector('.review-body__text').innerHTML = text;
			});
		}
	}
	loadReview();

	let chat = document.querySelector('.social-abs__btn');
	chat.addEventListener('click', () => {
		let wrapper = document.querySelector('.social-abs')
		wrapper.classList.toggle('up');
	});


	const mediaQuery = window.matchMedia('(min-width: 1000px)')
	if (mediaQuery.matches) {
		let menuHover = document.querySelector('.header__list>.menu-item-has-children');
		menuHover.addEventListener('mouseover', function (e) {
			e.preventDefault();
			document.querySelector('.header__list>.menu-item-has-children>ul').style.maxHeight = '750px';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.opacity = '1';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.padding = '75px 120px 55px 120px';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.overflow = 'visible';
		})
		menuHover.addEventListener('mouseleave', function () {
			document.querySelector('.header__list>.menu-item-has-children>ul').style.maxHeight = '0';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.opacity = '0';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.padding = '0';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.overflow = 'hidden';
		})
	}
	const mediaQuery2 = window.matchMedia('(max-width: 1000px)')
	if (mediaQuery2.matches) {
		let menuHover = document.querySelector('.header-mobile__nav .menu-item-has-children');
		console.log(menuHover)
		menuHover.addEventListener('click', function () {
			menuHover.classList.toggle('down');
		})
	}

	let menuDown = document.querySelectorAll('.header__list>.menu-item-has-children>ul>li');
	menuDown.forEach(element => {
		element.addEventListener('click', event => {
			element.classList.toggle('down');
		})
	})

	let contacts = document.querySelector('.contacts__title');
	let callback = document.querySelector('.callback__title ');

	contacts.addEventListener('click', function () {
		let titleWrapper = document.querySelector('.titles-switch');
		let info = document.querySelector('.contacts__content');
		let callbackInfo = document.querySelector('.callback__content');
		titleWrapper.classList.add('view-contacts');
		titleWrapper.classList.remove('view-callback');
		info.classList.add('view-contacts');
		callbackInfo.classList.remove('view-callback');
	});

	callback.addEventListener('click', function () {
		let titleWrapper = document.querySelector('.titles-switch');
		let info = document.querySelector('.contacts__content');
		let callbackInfo = document.querySelector('.callback__content');
		titleWrapper.classList.remove('view-contacts');
		titleWrapper.classList.add('view-callback');
		info.classList.remove('view-contacts');
		callbackInfo.classList.add('view-callback');
	});

}, false);
