$(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger').toggleClass('active');
		$('.header').toggleClass('active');
		$('.header__down').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.home__slider').slick({
		dots: true,
		arrows: false,
		asNavFor: '.home-slider__text',
		speed: 1800,
		pauseOnHover: false,
	});
	$('.home-slider__text').slick({
		dots: false,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		asNavFor: '.home__slider',
		speed: 2000,
		pauseOnHover: false,
	});
	$('.inside__slider').slick({
		dots: true,
		speed: 1500,
	});
	$('.partners__slider').slick({
		slidesToShow: 3,
		dots: true,
		speed: 1500,
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
		speed: 700,
		fade: true,
		cssEase: 'linear',
	});
	$('.effect__slider').slick({
		dots: true,
		speed: 1500,
	});
	$('.reviews__slider').slick({
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 2,
		variableWidth: true,
		speed: 2000,
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
		speed: 700,
		fade: true,
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 550,
				settings: {
					vertical: false,
				}
			},
		]
	});
	$('.popular__slider').slick({
		slidesToShow: 3,
		dots: true,
		speed: 1500,
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
		speed: 1500,
		responsive: [
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 770,
				settings: {
					slidesToShow: 1,
				}
			},
		]
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

	var $$ = function (selector, context) {
		var context = context || document;
		var elements = context.querySelectorAll(selector);
		return [].slice.call(elements);
	};

	function _fncSliderInit($slider, options) {
		var prefix = ".fnc-";

		var $slider = $slider;
		var $slidesCont = $slider.querySelector(prefix + "slider__slides");
		var $slides = $$(prefix + "slide", $slider);
		var $controls = $$(prefix + "nav__control", $slider);
		var $controlsBgs = $$(prefix + "nav__bg", $slider);
		var $progressAS = $$(prefix + "nav__control-progress", $slider);

		var numOfSlides = $slides.length;
		var curSlide = 1;
		var sliding = false;
		var slidingAT = +parseFloat(getComputedStyle($slidesCont)["transition-duration"]) * 1000;
		var slidingDelay = +parseFloat(getComputedStyle($slidesCont)["transition-delay"]) * 1000;

		var autoSlidingActive = false;
		var autoSlidingTO;
		var autoSlidingDelay = 5000; // default autosliding delay value
		var autoSlidingBlocked = false;

		var $activeSlide;
		var $activeControlsBg;
		var $prevControl;

		function setIDs() {
			$slides.forEach(function ($slide, index) {
				$slide.classList.add("fnc-slide-" + (index + 1));
			});

			$controls.forEach(function ($control, index) {
				$control.setAttribute("data-slide", index + 1);
				$control.classList.add("fnc-nav__control-" + (index + 1));
			});

			$controlsBgs.forEach(function ($bg, index) {
				$bg.classList.add("fnc-nav__bg-" + (index + 1));
			});
		};

		setIDs();

		function afterSlidingHandler() {
			$slider.querySelector(".m--previous-slide").classList.remove("m--active-slide", "m--previous-slide");
			$slider.querySelector(".m--previous-nav-bg").classList.remove("m--active-nav-bg", "m--previous-nav-bg");

			$activeSlide.classList.remove("m--before-sliding");
			$activeControlsBg.classList.remove("m--nav-bg-before");
			$prevControl.classList.remove("m--prev-control");
			$prevControl.classList.add("m--reset-progress");
			var triggerLayout = $prevControl.offsetTop;
			$prevControl.classList.remove("m--reset-progress");

			sliding = false;
			var layoutTrigger = $slider.offsetTop;

			if (autoSlidingActive && !autoSlidingBlocked) {
				setAutoslidingTO();
			}
		};

		function performSliding(slideID) {
			if (sliding) return;
			sliding = true;
			window.clearTimeout(autoSlidingTO);
			curSlide = slideID;

			$prevControl = $slider.querySelector(".m--active-control");
			$prevControl.classList.remove("m--active-control");
			$prevControl.classList.add("m--prev-control");
			$slider.querySelector(prefix + "nav__control-" + slideID).classList.add("m--active-control");

			$activeSlide = $slider.querySelector(prefix + "slide-" + slideID);
			$activeControlsBg = $slider.querySelector(prefix + "nav__bg-" + slideID);

			$slider.querySelector(".m--active-slide").classList.add("m--previous-slide");
			$slider.querySelector(".m--active-nav-bg").classList.add("m--previous-nav-bg");

			$activeSlide.classList.add("m--before-sliding");
			$activeControlsBg.classList.add("m--nav-bg-before");

			var layoutTrigger = $activeSlide.offsetTop;

			$activeSlide.classList.add("m--active-slide");
			$activeControlsBg.classList.add("m--active-nav-bg");

			setTimeout(afterSlidingHandler, slidingAT + slidingDelay);
		};



		function controlClickHandler() {
			if (sliding) return;
			if (this.classList.contains("m--active-control")) return;
			if (options.blockASafterClick) {
				autoSlidingBlocked = true;
				$slider.classList.add("m--autosliding-blocked");
			}

			var slideID = +this.getAttribute("data-slide");

			performSliding(slideID);
		};

		$controls.forEach(function ($control) {
			$control.addEventListener("click", controlClickHandler);
		});

		function setAutoslidingTO() {
			window.clearTimeout(autoSlidingTO);
			var delay = +options.autoSlidingDelay || autoSlidingDelay;
			curSlide++;
			if (curSlide > numOfSlides) curSlide = 1;

			autoSlidingTO = setTimeout(function () {
				performSliding(curSlide);
			}, delay);
		};

		if (options.autoSliding || +options.autoSlidingDelay > 0) {
			if (options.autoSliding === false) return;

			autoSlidingActive = true;
			setAutoslidingTO();

			$slider.classList.add("m--with-autosliding");
			var triggerLayout = $slider.offsetTop;

			var delay = +options.autoSlidingDelay || autoSlidingDelay;
			delay += slidingDelay + slidingAT;

			$progressAS.forEach(function ($progress) {
				$progress.style.transition = "transform " + (delay / 1000) + "s";
			});
		}

		$slider.querySelector(".fnc-nav__control:first-child").classList.add("m--active-control");

	};

	var fncSlider = function (sliderSelector, options) {
		var $sliders = $$(sliderSelector);

		$sliders.forEach(function ($slider) {
			_fncSliderInit($slider, options);
		});
	};

	window.fncSlider = fncSlider;

	fncSlider(".example-slider", { autoSliding: true });

});

window.addEventListener('load', function () {

	const onScrollHeader = () => { // объявляем основную функцию onScrollHeader

		const header = document.querySelector('.header') // находим header и записываем в константу

		let prevScroll = window.pageYOffset // узнаем на сколько была прокручена страница ранее
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
				let currentAirPopup = document.querySelector(`.popup-air[data-air="${currentAirPopupBtn}"]`)
				let closeAirIcon = currentAirPopup.querySelector('.air-close');
				closeAllAirPopups(allPopups);
				openAirConteiner();
				currentAirPopup.classList.add('air-popup_active');

				closeAirIcon.addEventListener('click', function () {
					currentAirPopup.classList.remove('air-popup_active');
					closeAirConteiner()
				})
			}


			function openAirPopupForForm(curretnDonePopup) {
				let allPopups = document.querySelectorAll('.popup-air');
				let currentAirPopup = document.querySelector(`.popup-air[data-air="${curretnDonePopup}"]`)
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

			function sendFormDone() {
				let allPopups = document.querySelectorAll('.popup-air');
				let curretnDonePopup = 'formdone';
				console.log(curretnDonePopup);
				closeAllAirPopups(allPopups)
				openAirPopupForForm(curretnDonePopup);
				setTimeout(function () {
					closeAllAirPopups(allPopups)
					setTimeout(closeAirConteiner, 1000);

				}, 3000);
			}

			//Успешная отправка формы
			document.addEventListener('wpcf7mailsent', function (event) {
				if ('279' == event.detail.contactFormId) {
					sendFormDone();
				}
				if ('280' == event.detail.contactFormId) {
					sendFormDone();
				}
				if ('311' == event.detail.contactFormId) {
					sendFormDone();
				}
				if ('199' == event.detail.contactFormId) {
					sendFormDone();
				}
				if ('108' == event.detail.contactFormId) {
					sendFormDone();
				}
			}, false);
		}
	}
	popupAir()

	function formStars() {
		let stars = document.querySelectorAll('.form-star');
		let inputOut = document.querySelector('.counter');
		for (let i = 0; i < stars.length; i++) {
			stars[i].addEventListener('click', function () {
				inputOut.value = i + 1;
				for (let k = 0; k < stars.length; k++) {
					stars[k].classList.remove('active');
				}
				stars[i].classList.add('active');
				if (i == 1) {
					stars[0].classList.add('active');
				}
				if (i == 2) {
					stars[0].classList.add('active');
					stars[1].classList.add('active');
				}
				if (i == 3) {
					stars[0].classList.add('active');
					stars[1].classList.add('active');
					stars[2].classList.add('active');
				}
				if (i == 4) {
					stars[0].classList.add('active');
					stars[1].classList.add('active');
					stars[2].classList.add('active');
					stars[3].classList.add('active');
				}
			})
		}
	}
	formStars();
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
			document.querySelector('.header__list>.menu-item-has-children>ul').style.maxHeight = '500px';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.opacity = '1';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.padding = '75px 50px 55px 50px';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.overflow = 'auto';
		})
		menuHover.addEventListener('mouseleave', function () {
			document.querySelector('.header__list>.menu-item-has-children>ul').style.maxHeight = '0';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.opacity = '0';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.padding = '0';
			document.querySelector('.header__list>.menu-item-has-children>ul').style.overflow = 'hidden';
		})
		let ulHover = document.querySelectorAll('.header__list>.menu-item-has-children>ul>li');
		ulHover.forEach(element => {
			element.addEventListener('mouseover', event => {
				if (event.target == event.currentTarget)
					element.classList.add('down');
			})
		})
		ulHover.forEach(element => {
			element.addEventListener('mouseleave', event => {
				if (event.target == event.currentTarget)
					element.classList.remove('down');
			})
		})
		function wrapperNav() {
			let navItems = document.querySelectorAll('.header__list>.menu-item-has-children>ul>li')
			let wrapper = document.createElement('div');
			wrapper.classList.add('nav-wrapper');
			let wrapper2 = document.createElement('div');
			wrapper2.classList.add('nav-wrapper');
			let wrapper3 = document.createElement('div');
			wrapper3.classList.add('nav-wrapper');
			for (let i = 0; i < navItems.length; i++) {
				if (i == 0 || i == 3 || i == 6) {
					wrapper.append(navItems[i]);
				}
				if (i == 1 || i == 4 || i == 7) {
					wrapper2.append(navItems[i]);
				}
				if (i == 2 || i == 5 || i == 8) {
					wrapper3.append(navItems[i]);
				}
			}
			let secondUl = document.querySelector('.header__list>.menu-item-has-children>ul');
			secondUl.classList.add('second-ul');
			secondUl.append(wrapper);
			secondUl.append(wrapper2);
			secondUl.append(wrapper3);
		}

		wrapperNav();
	}
	const mediaQuery2 = window.matchMedia('(max-width: 1000px)')
	if (mediaQuery2.matches) {
		let menuHover = document.querySelector('.header__list>.menu-item-has-children');
		menuHover.addEventListener('click', event => {
			if (event.target == event.currentTarget)
				menuHover.classList.toggle('down');
		})
		let menuDown = document.querySelectorAll('.header__list>.menu-item-has-children>ul>li');
		menuDown.forEach(element => {
			element.addEventListener('click', event => {
				if (event.target == event.currentTarget)
					element.classList.toggle('down');
			})
		})
	}

	if (document.querySelector('.contacts__title') !== null) {
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
	}

	[].forEach.call(document.querySelectorAll('input[type=tel]'), function (input) {
		var keyCode;
		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			var pos = this.selectionStart;
			if (pos < 3) event.preventDefault();
			var matrix = "+38 (___) ___ __ __",
				i = 0,
				def = matrix.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, ""),
				new_value = matrix.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a
				});
			i = new_value.indexOf("_");
			if (i != -1) {
				i < 5 && (i = 3);
				new_value = new_value.slice(0, i)
			}
			var reg = matrix.substr(0, this.value.length).replace(/_+/g,
				function (a) {
					return "\\d{1," + a.length + "}"
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
			if (event.type == "blur" && this.value.length < 5) this.value = ""
		}

		input.addEventListener("input", mask, false);
		input.addEventListener("focus", mask, false);
		input.addEventListener("blur", mask, false);
		input.addEventListener("keydown", mask, false)

	});

	let preloaderConteiner = document.querySelector('.preloader-conteiner');
	let app = document.querySelector('.app')
	setTimeout(() => {
		preloaderConteiner.classList.add('hidePreloader')
		app.style.display = "block"

	}, 200)


	function loadCurrentPrice() {
		let allelements = document.querySelectorAll('.body-item');
		if (allelements.length) {
			let getValue = document.querySelector('#get-value').value;
			for (let i = 0; i < allelements.length; i++) {
				let currentText = allelements[i].querySelector('.body-item__head .body-head__title').innerHTML;
				if (getValue == currentText) {
					allelements[i].closest('.price-item').classList.add('active-price');
					allelements[i].classList.add('active-price-category');
					allelements[i].classList.add('highlight');
					setTimeout(() => {
						allelements[i].classList.remove('highlight');
					}, 4000)
					let topheight = document.getElementById("pricemain").offsetTop;
					window.scrollTo({
						top: topheight,
						left: 0,
						behavior: 'smooth'
					});
				}
			}
		}
	}
	loadCurrentPrice();

	function openPrice() {
		let category = document.querySelectorAll('.price-item');
		for (let i = 0; i < category.length; i++) {
			category[i].querySelector('.price-item__head').addEventListener('click', function () {
				category[i].classList.toggle('active-price');
			})
		}
	}
	openPrice();

	function openPriceCategory() {
		let categoryPrice = document.querySelectorAll('.body-item')
		for (let i = 0; i < categoryPrice.length; i++) {
			categoryPrice[i].querySelector('.body-item__head').addEventListener('click', function () {
				// for(let k = 0; k < categoryPrice.length; k++){
				// 	categoryPrice[k].classList.remove('active-price-category');
				// }
				categoryPrice[i].classList.toggle('active-price-category');
			})
		}
	}
	openPriceCategory();


	function search() {
		let input = document.getElementById("inputSearch");
		let filter = input.value.toUpperCase();
		let ul = document.getElementById("list");
		let li = ul.getElementsByTagName("li");

		// Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
		for (let i = 0; i < li.length; i++) {
			let h5 = li[i].getElementsByTagName("h5")[0];
			if (h5.innerHTML.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = "";
				document.querySelector('.search__down').classList.remove('hedesearch')
			} else {
				li[i].style.display = "none";
				document.querySelector('.search__down').classList.add('hedesearch')
			}
		}
	}
	function startSearch() {
		let currentInput = document.querySelector('#inputSearch')
		if (currentInput != null) {
			currentInput.addEventListener('keyup', search);
		}
		else {
			return;
		}
	}
	startSearch()


	function animateController() {
		new Skroll({
			mobile: true,
		})
			.add(".service-info__title", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})

			.add(".home-info__title", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".title__wrapper", {
				delay: 100,
				duration: 1200,
				animation: "fadeInLeft"
			})

			.add(".help-item", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".med__dots-wrapper", {
				delay: 300,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".med__slider", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})

			.add(".popular__slider-item", {
				delay: 100,
				duration: 1000,
				animation: "flipInY"
			})
			.add(".reviews__slider", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".contacts", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".title__wrapper-eployer", {
				delay: 100,
				duration: 1000,
				animation: "fadeInRight"
			})
			.add(".partners__slider", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".clinic__info-title", {
				delay: 100,
				duration: 1000,
				animation: "fadeInLeft"
			})
			.add(".clinic__info-subtitle", {
				delay: 100,
				duration: 1000,
				animation: "fadeInRight"
			})
			.add(".clinic__info-redactor", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".clinic__img", {
				delay: 300,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".price-info__title", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})

			// .add(".sercive-info__btn", {
			//     delay: 100,
			//     duration: 1000,
			//     animation: "fadeInUp"
			// })

			.add(".price__search", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".price-item", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".spec__items", {
				delay: 100,
				duration: 1000,
				animation: "fadeopacity"
			})
			.add(".articles-item", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".cosmo__item", {
				delay: 200,
				duration: 1000,
				animation: "flipInY"
			})
			.add(".inside__content", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".inside-slider__section", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".inside-btns__section", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".mony ul li", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".mony h3", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".inside__video-section", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})

			.add(".inside__gold", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})

			.add(".inside-slide__section-two", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})


			.add(".faq__title", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".faq-item", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".about__info-text", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".about__slider-wrapper", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".benefits-item", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".employer__slider", {
				delay: 100,
				duration: 1000,
				animation: "fadeopacity"
			})
			.add(".documents__item", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".info__content", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".vertical-text", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.add(".vertical-text__wrapper", {
				delay: 100,
				duration: 1000,
				animation: "fadeInDown"
			})

			.add(".big-image-box", {
				delay: 100,
				duration: 1000,
				animation: "fadeInUp"
			})
			.init()
			.recalcPosition()
	}

	animateController()

}, false);


