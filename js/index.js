$(document).ready(function($) {
	loadBigImage();
	initWindow();
	hoverLogo();
	showWechat();
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
	$(".right_side").css({
		'left': '0',
		'right': '0',
		'width': "100%"
	});
	$(".article").css({
		'left': '2%',
		'right': '',
		'width': '95%'
	});
	$(".side_bar").css({
		'display': 'none'
	});
}

function webWindow() {
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
	$(".bg").width(width);
	$(".right_side").width(11*width/20);
}

function setPanelHeight() {
	var height = window.screen.availHeight;
	var content_height = $(document).height();
	var win_height = $(window).height();
	var category_height = $(".category").height();
	$(".bg").height(height);
	$(".right_side").height(content_height);
	$(".category").css("top", (win_height - category_height)/2);
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
	$('.bg img').load(function() {
		$(".right_side").stop(1).animate({
			right: 0
		}, "300");
	});
}

function hoverLogo(){
	$(".logo img").hover(function() {
		$(this).css('background-color','#d5d5d5');
	}, function() {
		$(this).css('background-color','gray');
	});
}

function showWechat() {
	$(".wechat").hover(function() {
		$(".wechat_img").fadeIn('fast');
	}, function() {
		$(".wechat_img").fadeOut('fast');
	});
}

function collectArticleByMouth() {
	var current_year = '';
	var current_month = '';
	$(".bg").one('click', function() {
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
	var colorl = new Array('#1abc9c', '#16a085', '#f1c40f', '#f39c12', '#2ecc71', '#27ae60', '#e67e22', '#d35400', '#3498db', '#2980b9', '#e74c3c', '#c0392b');
	var random_num = Math.floor(Math.random() * 12);
	$(".tag_color").each(function() {
		if (random_num === 11) {
			random_num = 0;
		}
		$(this).css("background-color", colorl[random_num]);
		random_num += 1;
	});
}
