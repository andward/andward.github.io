// Page init variable
var pageInit = {
	// Init function
	init: function(settings) {
		// Page configration, can be overrided by settings
		pageInit.config = {
			backgroudBlock: $(".bg"),
			windowWidth: $(window).width(),
			navBar: $(".side_bar"),
			article: $(".article"),
			articleWidth: $(".article").width(),
			tagList: $(".tag_post_list"),
			tagListUl: $(".tag_post_list ul"),
			posts: $(".posts")
		};

		$.extend(pageInit, settings);

		pageInit.changeWindowSize();
		pageInit.hoverBar();
		pageInit.showFilteredPostByHoverTag();
		pageInit.collectArticleByMonth();
		pageInit.randomColor();
	},

	// Suit of init page widow size
	changeWindowSize: function() {
		if (pageInit.config.windowWidth > pageInit.config.articleWidth) {
			pageInit.setWebPanelHeight();
			pageInit.setArticleLeft();
			//pageInit.setBgBlockSize(); 
		}
	},

	// Suit of random colors for element
	randomColor: function() {
		pageInit.randomInitBgColor();
		pageInit.randomTimeBlockColor();
		pageInit.randomColorInSideBar();
		pageInit.changeBgColorByScroll();
	},

	// Set Article default right 
	setArticleLeft: function() {
		var left_distance = (pageInit.config.windowWidth - pageInit.config.articleWidth) / 2;
		pageInit.config.article.css("left", left_distance);
	},

	// Set web default height
	setWebPanelHeight: function() {
		var height = window.screen.availHeight;
		var content_height = $(document).height();
		var tag_count = $(".tag_container").length;
		var tag_height = $(window).height() / tag_count;
		$(".tag_container").height(tag_height);
		$(".tag_color").height(tag_height);
		$(".tag_content").css("line-height", tag_height + "px");
		$(".contact_content").css("line-height", tag_height + "px");
	},

	// Set div color in background
	setBgBlockSize: function() {
		pageInit.config.backgroudBlock.find(".auto_color").css({
			'width': pageInit.config.backgroudBlock.width() / 3,
			'height': pageInit.config.backgroudBlock.height() / 5
		});
	},

	// Animation of hovar sidebar
	hoverBar: function() {
		var left_distance = (pageInit.config.windowWidth - pageInit.config.articleWidth) / 2;
		$(".fun_bar").hover(function() {
			pageInit.config.navBar.stop().animate({
				width: 150
			}, "fast");
			pageInit.config.navBar.css(
				"border-right", "1px solid #e5e5e5"
			);
			pageInit.config.article.stop().animate({
				left: left_distance + 100
			}, "fast");
			pageInit.config.tagList.css("left", "151px");
		}, function() {
			pageInit.config.tagListUl.css("display", "none");
			pageInit.config.tagList.stop().animate({
				width: 0
			}, "fast", function() {
				pageInit.config.tagList.stop().animate({
					left: 40
				}, "fast", function() {
					pageInit.config.navBar.stop().animate({
						width: 10
					}, "fast");
					pageInit.config.navBar.css(
						"border-right", "");
					pageInit.config.article.stop().animate({
						left: left_distance
					}, "fast");
				});
			});
		});
	},

	// Display collected month
	showMonth: function() {
		$(".time").css("display", "block");
	},

	// Seprate articles by month
	collectArticleByMonth: function() {
		var current_year = '';
		var current_month = '';
		pageInit.config.posts.find("li").each(function() {
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
	},

	// Animation of tag list display
	showFilteredPostByHoverTag: function() {
		$(".tag_content").hover(function() {
				var tag = $(this).html();
				pageInit.config.tagList.stop().animate({
					width: 250
				}, "fast", function() {
					pageInit.config.tagListUl.css("display", "none");
					pageInit.config.tagListUl.each(function() {
						if ($(this).hasClass(tag)) {
							$(this).fadeIn('fast');
						}
					});
				});
			},
			function() {
				return 0;
			});
	},

	// Random div color
	randomBackgoundColor: function(element) {
		var colorl = new Array('#1abc9c', '#16a085', '#f1c40f', '#f39c12', '#2ecc71', '#27ae60', '#e67e22', '#d35400', '#3498db', '#2980b9', '#e74c3c', '#c0392b');
		var random_num = Math.floor(Math.random() * 12);
		$(element).each(function() {
			if (random_num === 11) {
				random_num = 0;
			}
			$(this).css("background-color", colorl[random_num]);
			random_num += 1;
		});
	},

	// Init color in bg div
	randomInitBgColor: function() {
		pageInit.randomBackgoundColor(".bg .auto_color");
	},

	// Random month color
	randomTimeBlockColor: function() {
		pageInit.config.backgroudBlock.one('click', function() {
			/* Act on the event */
			pageInit.randomBackgoundColor(".time");
			pageInit.showMonth();
		});
	},

	// Random tag color in sidebar
	randomColorInSideBar: function() {
		pageInit.randomBackgoundColor(".tag_color");
	},

	// Random bg color by scroll
	changeBgColorByScroll: function() {
		$(window).scroll(function() {
			if ($(document).scrollTop() % 10 === 0) {
				pageInit.randomBackgoundColor(".bg .auto_color");
			}
		});
	}

};


//Init page
$(document).ready(pageInit.init);