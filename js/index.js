$(document).ready(function($) {
	hoverBar();
	setLeft();
});



function hoverBar() {
	$(".side_bar").hover(function() {
		$(this).animate({
			width: 150
		}, 300);
		$(".article").animate({
			left: "+=100px"
		}, 300);
	}, function() {
		$(this).animate({
			width: 40
		}, 300);
		$(".article").animate({
			left: "-=100px"
		}, 300);
	});
}

function setLeft() {
	var w = $(window).width();
	$(".article").css("left",(w-650)/2);
}