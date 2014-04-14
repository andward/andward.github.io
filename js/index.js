$(document).ready(function($) {
	initWindow();
	loadBigImage();
	hoverLogo();
	collectArticleByMouth();
	showFilteredPostByHoverTag();
	randomColor();
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
	$(".fun_bar").hover(function() {
		$(".side_bar").stop().animate({
			width: 150
		}, "fast");
		$(".article").stop().animate({
			left: left_distance + 100
		}, "fast");
		$(".tag_post_list").stop().animate({
			left: 150
		}, "fast");
	},function() {
		$(".tag_post_list ul").css("display", "none");
		$(".tag_post_list").stop().animate({
			width: 0
		}, "fast", function() {
			$(".tag_post_list").stop().animate({
				left: 40
			}, "fast", function() {
				$(".side_bar").stop().animate({
					width: 40
				}, "fast");
				$(".article").stop().animate({
					left: left_distance
				}, "fast");
			});
		});
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
			var html = "<div class='time'>" + month + year + "</div>";
			if (current_year === '') {
				$(this).before(html);
				current_year = year;
				current_month = month;
			} else if (current_year === year) {
				if (current_month != month) {
					$(this).before(html);
					current_month = month;
				}
			} else {
				$(this).before(html);
				current_year = year;
				current_month = month;
			}
		});
		$(".left_pic img").css('opacity', 0.5);
		setPanelHeight();
	});
}

function showFilteredPostByHoverTag() {
	$(".tag_content").hover(function() {
			var tag = $(this).html();
			$(".tag_post_list").stop().animate({
				width: 250
			}, "fast", function() {
				$(".tag_post_list ul").css("display", "none");
				$(".tag_post_list ul").each(function() {
					if ($(this).hasClass(tag)) {
						$(this).fadeIn('fast');
					}
				});
			});
		},
		function() {
			return 0;
		});
}

function randomColor() {
	var random_color = new Array;
	var colorl = new Array('#e67e22', '#2ecc71', '#f1c40f', '#e74c3c', '#3498db', '#7f8c8d', '#9b59b6', '#d35400', '#c0392b', '#bdc3c7', '#34495e', '#16a085');
	var random = 0;
	$(".tag_color").each(function() {
		var random_num = Math.floor(Math.random() * 12);
		if (random_num === random) {
			if (random_num === 11) {
				random_num = 10;
			} else if (random_num === 0) {
				random_num = 1;
			} else {
				random_num += 1;
			}
		}
		$(this).css("background-color", colorl[random_num]);
		random = random_num;
	});
}
