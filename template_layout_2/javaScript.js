
$(".header[data-type='background']").each(function(){
	var $bgobj = $(this);
	$(window).scroll(function(){
		var yPos = -($(window).scrollTop() / $bgobj.data("speed"));
		var coords = "50%" + yPos + "px";
		$bgobj.css("background-position", coords);
	});
});
$(".your-project[data-type='background']").each(function(){
	var $paral = $(this);
	$(window).scroll(function(){
		var yPos = -($(window).scrollTop() / $paral.data("speed"));
		var coords = "100%" + yPos + "px";
		$paral.css("background-position", coords);
	});
});



$('.owl-carousel').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    responsive:{
        320:{
            items:1
        },
        480:{
        	items:2
        },
        667:{
            items:2
        },
        1024:{
            items:3
        },
        1366: {
        	items:4
        }
    }
})



function slowScroll (id) {
	var offset = 0;
	$('html, body').animate({
		scrollTop: $(id).offset().top - offset
	}, 700);
	return false;
}


$("header .navbar").removeClass("fix-nav");
$(window).scroll(function() {
	if ($(this).scrollTop() > 40) {
		$("header .navbar").addClass("fix-nav").fadeIn('1000');
	}	else {
		$("header .navbar").removeClass("fix-nav").fadeIn('1000');
	};
	if ($(this).scrollTop() > 800) {
		$("header .navbar").addClass("fix-nav-r").fadeIn('1000');
	}   else {
		$("header .navbar").removeClass("fix-nav-r").fadeIn('long');
	};
});


