$(document).ready(function($) {
	initWindow();
	showWechat();
	collectArticleByMouth();
	showFilteredPostByHoverTag();
	randomColorInSideBar();
	changeBgColorByScorll();
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
			setDivWidthInBg();
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
		setDivWidthInBg();
		setArticleLeft();
		randomBackgoundColor(".bg .auto_color");
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
	$("#home").css({
		'margin':'0 5%'
	});
}

function webWindow() {
	$(".right_side").css({
		'right': '0',
		'left': ''
	});
	$(".article").css({
		'left': '',
		'right': '',
		'width': '650px'
	});
	$(".side_bar").css({
		'display': 'block'
	});
	$("#home").css({
		'margin':'0 15%'
	});
}

function setPanelWidth() {
	var width = window.screen.availWidth;
	$(".bg").width(2*width/5);
	$(".right_side").width(3*width/5-10);
}

function setDivWidthInBg(){
	var width = $(".bg").width();
	var height = $(".bg").height();
	$(".bg .auto_color").css({
		'width': width/3,
		'height': height/5
	});
}

function setPanelHeight() {
	var height = window.screen.availHeight;
	var content_height = $(document).height();
	var tag_count = $(".tag_container").length;
	var tag_height = $(window).height()/tag_count;
	$(".bg").height(height);
	$(".tag_container").height(tag_height);
	$(".tag_color").height(tag_height);
	$(".tag_content").css("line-height",tag_height+"px");
	$(".contact_content").css("line-height",tag_height+"px");
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
		$(".tag_post_list").css("left","151px");
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
		randomBackgoundColor(".time");
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

function randomBackgoundColor(element){
	var colorl = new Array('#1abc9c', '#16a085', '#f1c40f', '#f39c12', '#2ecc71', '#27ae60', '#e67e22', '#d35400', '#3498db', '#2980b9', '#e74c3c', '#c0392b');
	var random_num = Math.floor(Math.random() * 12);
	$(element).each(function() {
		if (random_num === 11) {
			random_num = 0;
		}
		$(this).css("background-color", colorl[random_num]);
		random_num += 1;
	});
}

function randomColorInSideBar() {
	randomBackgoundColor(".tag_color");
}

function changeBgColorByScorll() {
	$(window).scroll(function() {
		if ($(document).scrollTop() % 10 === 0) {
			randomBackgoundColor(".bg .auto_color");
		}
	});
}
