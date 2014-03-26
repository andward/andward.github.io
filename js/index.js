$(document).ready(function($) {
	initWindow();
	setPanelWidth();
    setLeft();
	loadBigImage();
	hoverBar();
	hoverLogo();
});

resizeWindow();

function resizeWindow() {
	$(window).resize(function() {
		if ($(window).width() < 800) {
			mobileWindow();
		} else {
			webWindow();
		}
	});
}

function initWindow() {
	if ($(window).width() < 800) {
		mobileWindow();
	}
}

function mobileWindow() {
	$(".left_pic").css({
		'display': 'none'
	});
	$(".right_side").css({
		'left': '5px',
		'right': '5px',
		'width': "100%"
	});
	$(".article").css({
		'left': '5px',
		'right': '',
		'width': '95%'
	});
	$(".side_bar").css({
		'display': 'none'
	});
}

function webWindow() {
	$(".left_pic").css({
		'left': 0,
		'right': '',
		'display': 'block'
	});
	$(".right_side").css({
		'right': 0,
		'left': ''
	});
	setPanelWidth();
	$(".article").css({
		'left': '',
		'right': '',
		'width': '650px'
	});
	$(".side_bar").css({
		'display': 'block'
	});
}

function setPanelWidth() {
	var height = window.screen.availHeight;
	var width = window.screen.availWidth;
	$(".left_pic").width(width/2);
	$(".left_pic").height(height);
	$(".right_side").width(width/2);
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

