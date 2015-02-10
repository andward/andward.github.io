// Page init
var pageInit = {
	// Init
	init: function(settings) {
		pageInit.config = {
			mainbody: $(".mainbody"),
			painting: $(".painting"),
			abstract: $(".abstract"),
			scrollSpeed: 500
		};
		$.extend(pageInit, settings);

		pageInit.fullpage();
	},

	fullpage: function() {
		pageInit.config.mainbody.fullpage({
			scrollingSpeed: pageInit.config.scrollSpeed,
			onLeave: function(index, direction) {
				if (index == 1) {
					pageInit.config.painting
					.find(".text")
					.animate({
						'top': '-=50px'
					}, 1000);
					pageInit.config.abstract
					.find('.text')
					.css('top', 0);
				} else if (index == 2) {
					pageInit.config.abstract
					.find('.text')
					.animate({
						'top': '-=50px'
					}, 1000);
					pageInit.config.painting
					.find(".text")
					.css("top", 0);
				}
			}
		});
	}
};

$(document).ready(pageInit.init);