$(document).ready(function($) {
	hoverBar();
	setLeft();
});



function hoverBar() {
	var left_distance = ($(window).width() - 650) / 2;
	$(".side_bar").hover(function() {
		$(this).stop().animate({
			width: 150
		}, 300);
		$(".article").stop().animate({
			left: left_distance + 100
		}, 300);
	}, function() {
		$(this).stop().animate({
			width: 40
		}, 300);
		$(".article").stop().animate({
			left: left_distance
		}, 300);
	});
}

function setLeft() {
	var w = $(window).width();
	$(".article").css("left",(w-650)/2);
}