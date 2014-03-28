/*Siarhei Plashchynski*/

var $win = $(window);

var mountNav = function(){
	var $marker = $('.form__nav');
	var navMenu = $($marker).find('ul');
	var $topLine = $('.z-head').height();
	var contactPoint = $marker.offset().top - $topLine;
	var windowsHeight = $(window).height();
	var navMenuHeight =  navMenu.height();
	var navMenuHeightAdjusted = navMenuHeight + 90;

	if (windowsHeight > navMenuHeightAdjusted && $win.scrollTop() >= contactPoint) {
		navMenu.css({"top":contactPoint, "position":"fixed"});
	} else {
		navMenu.css({"top":'0', "position":'absolute'});
	}
};
	
	var toggleActive = function () {
		$(this).toggleClass('active');
	};

		var rouletteCount = 0;

		var roulette = function(){
								
								var speed = 10000;// время анимации 10s 
								var revolutions = 24;// колическо пустых оборотов до выбора нужно сектора
								var animateType = 'cubic-bezier(.785,0.135,0.05,1.025)';//  анимации

								var sectorNumber = Math.random( ) * (15+1);// рандом от 0 до 15
								sectorNumber = parseInt(sectorNumber);// округление
								
								var sector = $('li', '.roll-container');// все сектора
								var degSector = 22.5 * sectorNumber;// разница в градусном расположении секторов уможенная на рандом от 0 до 15
								
								var rotation = revolutions * 360;// количесво оборотов переводим в градусы
								var rotationToPoint = rotation - degSector;// вычесляем количество градусов до нужно сектора с учетом количесва оборотов

								$(sector[sectorNumber]).addClass('point');// добовляем класс выгришному сектору
								
								var $elie = $('.roll-container');// подвижная часть барабана
								var animateSpeed = speed/1000;// время в секуднах
								var animate = 'all' + ' ' + animateSpeed + 's' + ' ' + animateType; // transition css 

								$elie.css({'-webkit-transition': animate})
											.css({'-moz-transition': animate})
											.css({'-o-transition': animate})
											.css({'transition': animate});// добовляем анимцию к барабану

									function rotate(degree) {
											var next = rotation * rouletteCount;
											degree = degree + next;
											sector.removeClass('win');
											$('.luminous').removeClass('flashing');
											$('.start-button').addClass('disable');
											$elie.css({ WebkitTransform: 'rotate(' + degree + 'deg)'})
											.css({ '-moz-transform': 'rotate(' + degree + 'deg)'})
											.css({ '-o-transform': 'rotate(' + degree + 'deg)'})
											.css({ '-ms-transform': 'rotate(' + degree + 'deg)'})
											.css({ 'transform': 'rotate(' + degree + 'deg)'});

											rouletteCount = ++rouletteCount;

											setTimeout(winEvent, speed);
										}//крутим, дизэйблим кнопку, запускаем таймаут на время анимации и вычесляем количество градусов при каждом новом запуске складывая колицество открученых градусов с новой порцией (вызываеться чуть ниже rotate(rotationToPoint);)

										var winEvent = function(){
											$('.point').addClass('win').removeClass('point');
											$('.luminous').addClass('flashing');
											$('.start-button').removeClass('disable');
										};// приводим все к выигришному виду по окончанию таймаута


										rotate(rotationToPoint);
							};


$win.load(function() {

	$('.start-button').click(function(){
		if(!$(this).hasClass('disable')){
				roulette();
			}
	});

	$('.tip').powerTip({
		placement: 's',
		smartPlacement: true,
		manual: true,
		mouseOnToPopup: true,
		fadeInTime: 100,
		followMouse: true
	});
	
		$('.show-tip').hover(function(){
			$(this).parent().find('.tip').powerTip('show');
		},function(){
			$(this).parent().find('.tip').powerTip('hide');
		});


	$win.scroll(function() {
		mountNav();
	});

	$(document).on('click','.toggle-active', toggleActive);

	$('.dd_list li').click(function(){
		var newSelect = $(this).find('span').html();
		$(this).parents('.form__ddown').find('.dd_selected span').html(newSelect);
	});

	$('.item_tooltip').hover(function(){
		$(this).find('.tooltip').fadeIn(400);
	},
	function(){
		$(this).find('.tooltip').stop().fadeOut(200);
	});

	$('.player-line','.form__overall-rating').click(function(){
		$(this).toggleClass('mark');
	});

		var tabContainers = $('.progress__tabs > div');
		tabContainers.hide().filter(':first').show();

		$('.progress__tabs ul.tabNavigation a').click(function () {
			tabContainers.hide();
			tabContainers.filter(this.hash).show();

			$('.progress__tabs ul.tabNavigation a').removeClass('selected');
			$(this).addClass('selected');
			return false;

		}).filter(':first').click();

			function hidePopup(){
				$popup.fadeOut(300).animate({
					opacity : 0
				});
			}
			function hideOverlay(){
				$overlay.fadeOut(300).animate({
					opacity : 0
				});
			}

			var $overlay = $('.d-overlay');
			var $popup = $('.d-popup');

			$('.do-overlay').click(function(){
				var popuoLink = $(this).attr('rel');
				if(!popuoLink){
					popuoLink = $(this).attr('id');
				}
				var popupId = "#" + popuoLink + '_popup';

				$overlay.css('display','block').animate({
					opacity : 0.7
				}, 300);
				$(popupId).css('display','block').animate({
					opacity : 1
				}, 300);
			});

			$('.next_popup').click(function(){
				hidePopup();
				var nextPopup = $(this).attr('href');
				nextPopup = nextPopup + "_popup";
				$(nextPopup).css('display','block').animate({
					opacity : 1
				}, 300);
			});

			$('.d-popup_close, .t-button-c').click(function(){
				hidePopup();
				hideOverlay();
			});

			$(document).keydown(function(e){
				if(e.which === 27){
					hidePopup();
					hideOverlay();
				}
			});



			function animatingСounter(s){
				$('.next').animate({
							marginTop: 0
						}, s, function(){
							$(this).removeClass('next');
							$(this).next().remove();
						});
			}

			function counting() {
				var animationSpeed = 600;

				window.counter++;

				var count_string = String(window.counter).split("").reverse().join("");
				
				for (var i=count_string.length - 1; i >= 0; i--) {
					var count = $($('#count li')[6 - i]);
					if (count.find('span').html() !== count_string[i]) {
						count.prepend('<span class="next">' + count_string[i] + '</span>');
						animatingСounter(animationSpeed);
					}
				}

				setTimeout(counting, animationSpeed);
			}
			window.counter = 0;
			counting();


		function freaky_shdw () {
			$('.light', '.start-button').toggleClass('active');
		}
		setInterval(freaky_shdw, 2000);

});

