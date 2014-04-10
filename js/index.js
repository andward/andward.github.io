$(document).ready(function($) {
	initWindow();
	loadBigImage();
	hoverLogo();
	collectArticleByMouth();
});

resizeWindow();


function resizeWindow() {
	$(window).resize(function() {
		if ($(window).width() < 800) {
			mobileWindow();
		} else {
			webWindow();
			setPanelWidth();
			setPanelHeight();
			setArticleLeft();
		}
	});
}

function initWindow() {
	if ($(window).width() < 800) {
		mobileWindow();
	} else {
		setPanelWidth();
		setPanelHeight();
		setArticleLeft();
		hoverBar();
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
	var width = window.screen.availWidth;
	$(".left_pic").width(width/2);
	$(".right_side").width(width/2);
}

function setPanelHeight() {
	var height = window.screen.availHeight;
	var content_height = $(document).height();
	$(".left_pic").height(height);
	$(".right_side").height(content_height);
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

function setArticleLeft() {
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
	var current_year = '';
	var current_month = '';
	$(".left_pic").one('click', function() {
		/* Act on the event */
		$(".posts li").each(function() {
			var date = $(this).find('span').html().split(" ");
			var year = date[2];
			var month = date[1] + " ";
			if (current_year === '') {
				$(this).prepend("<div class='time'>" + month + year + "</div>");
				current_year = year;
				current_month = month;
			} else if (current_year === year) {
				if (current_month != month) {
					$(this).prepend("<div class='time'>" + month + year + "</div>");
					current_year = year;
					current_month = month;
				}
			} else {
				$(this).prepend("<div class='time'>" + month + year + "</div>");
				current_year = year;
				current_month = month;
			}
		});
		$(".left_pic img").css('opacity', 0.5);
		setPanelHeight();
	});
}
