// Page init
var pageInit = {
	// Init
	init: function(settings) {
		pageInit.config = {
			mainbody: $(".mainbody"),
		};
		$.extend(pageInit, settings);

		pageInit.fullpage();
	},

	fullpage: function() {
		pageInit.config.mainbody.fullpage();
	}
};
