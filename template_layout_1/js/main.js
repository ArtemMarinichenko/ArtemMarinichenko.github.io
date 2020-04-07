// Скрипт переключения вкладок в секции tabs
$(document).ready(function(s) {
	$('.tabs-content').hide();
	$('.tabs-content:first').show();
	$('.tabs-btn li:first').addClass('active');
	$('.tabs-btn li').click(function(event) {
		$('.tabs-btn li').removeClass('active');
		$(this).addClass('active');
		$('.tabs-content').hide();
		var selectTab = $(this).find('a').attr('href');
		$(selectTab).fadeIn();
	});


// Подключение и инициализация слайдера owlCarousel
	$(".owl-carousel").owlCarousel({
	    nav: false,
	    items: 2,
	    responsiveClass:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        768:{
	            items:2
	        }
	    }
	});

// Подключение скритта меню mmenu
	$('#my-menu').mmenu({
		extensions: [ 'effect-menu-slide', 'shadow-page',  'position-right', 'fx-listitems-slide', 'border-none' ]
	});		
	var $icon = $("#my-icon");
	var API = $('#my-menu').data( "mmenu" );
	$icon.on( "click", function() {
	   API.open();
	});
	API.bind( "open:finish", function() {   
	      $icon.addClass( "is-active" );   
	});
	API.bind( "close:finish", function() {
	      $icon.removeClass( "is-active" );
	});


// Подключение скрипта плавного скролинга к якорю
	$('.mm-listview').on('click', 'a', function(event) {
		event.preventDefault();
		var id = $(this).attr('href'),
		top = $(id).offset().top;
		$('body, html').animate({scrollTop: top}, 700);
	})
});