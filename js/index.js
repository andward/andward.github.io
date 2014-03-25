$(document).ready(function($) {
	setPanelWidth();
    setLeft();
	loadBigImage();
	hoverBar();
	hoverLogo();
});

$(window).resize(function() {
	if ($(window).width() < 800) {
		$(".right_side").css({
			'left': 0,
			'right': ''
		});
		$(".article").css({
			'left': 0,
			'right': 0,
			'width': "95%"
		});
		$(".side_bar").css({
			'display': 'none'
		});
	} else {
		$(".right_side").css({
			'left': '',
			'right': 0
		});
		$(".article").css({
			'left': '',
			'right': '',
			'width': '650px'
		});
		$(".side_bar").css({
			'display': 'block'
		});
	}
});

function setPanelWidth() {
	var width = $(window).width()/2;
	$(".left_pic").width(width);
	$(".right_side").width(width);
}

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

function loadBigImage() {
	$(".left_pic img").load(function(){
		$(this).fadeIn(300);
	});
}

function hoverLogo(){
	$(".logo img").hover(function() {
		$(this).css('background-color','#d5d5d5');
	}, function() {
		$(this).css('background-color','gray');
	});
}

function collectArticleByMouth() {
	$(".posts li").each(function() {
		var date = $(this).find('span').html();
	});
}

