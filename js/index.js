$(document).ready(function($) {
	showFilteredPostByHoverTag();
	initWindow();
	showWechat();
	collectArticleByMouth();
	randomColorInSideBar();
	changeBgColorByScorll();
});

resizeWindow();

function resizeWindow() {
	$(window).resize(function() {
		changeWindowSize();
	});
}

function initWindow() {
	changeWindowSize();
	hoverBar();
	randomBackgoundColor(".bg .auto_color");
}

function changeWindowSize() {
	if ($(window).width() < 800) {
		mobileWindow();
		setMobilePanelWidth();
		setMobilePanelHeight();
		setDivSizeInBg();
	} else {
		webWindow();
		setWebPanelWidth();
		setWebPanelHeight();
		setDivSizeInBg();
		setArticleLeft();
	}
}

function mobileWindow() {
	$(".bg").css({
		'left': '',
		'top': '0',
		'z-index': '1002'
	});
	$(".right_side").css({
		'left': '0',
		'right': '0',
		'width': "100%"
	});
	$(".article").css({
		'left': '2%',
		'right': '2%',
		'width': '96%'
	});
	$(".side_bar").css({
		'display': 'none'
	});
	$("#home").css({
		'margin': '0 5%'
	});
	$(".index_head").css({
		'font-size': '30px'
	});
	$(".posts").css({
		'text-align': 'center'
	});
	$(".posts li").css({
		'border-bottom': '1px solid #f5f5f5'
	});
	$(".auto_color").css({
		'display': 'none'
	});
	$(".time").css({
		'margin': '20px auto'
	});
}

function webWindow() {
	$(".bg").css({
		'left': '0',
		'top': '',
		'z-index': '998'
	});
	$(".right_side").css({
		'right': '0',
		'left': ''
	});
	$(".article").css({
		'left': '',
		'right': '',
		'width': '740px'
	});
	$(".side_bar").css({
		'display': 'block'
	});
	$("#home").css({
		'margin': '0 15%'
	});
	$(".index_head").css({
		'font-size': '40px'
	});
	$(".posts").css({
		'text-align': 'left'
	});
	$(".posts li").css({
		'border-bottom': ''
	});
	$(".auto_color").css({
		'display': 'block'
	});
	$(".time").css({
		'margin': '20px 15px'
	});
}


function setWebPanelWidth() {
	var width = window.screen.availWidth;
	$(".bg").width(2*width/5);
	$(".right_side").width(3*width/5-10);
}

function setMobilePanelWidth() {
	var width = $(window).width();
	$(".bg").width(width);
}

function setDivSizeInBg() {
	var width = $(".bg").width();
	var height = $(".bg").height();
	$(".bg .auto_color").css({
		'width': width/3,
		'height': height/5
	});
}

function setWebPanelHeight() {
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

function setMobilePanelHeight() {
	$(".bg").height("4em");
}

function hoverBar() {
	var left_distance = ($(window).width() - 740) / 2;
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
	$(".article").css("left",(w-740)/2);
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
	$(".bg").one('click', function() {
		/* Act on the event */
		var time = $(".time");
		if ($(window).width() < 800) {
			time.css({
				'margin': '20px auto'
			});
		} else {
			time.css({
				'margin': '20px 15px'
			});
		}
		time.css({
			'display': 'block'
		});
		randomBackgoundColor(".time");
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
