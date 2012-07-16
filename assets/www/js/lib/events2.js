
app.events = {};

app.events.runAll = function(){
	app.events.footBarOnClick();
	app.events.mainPageHeadBarOnClick();
};

app.events.footBarOnClick = function(){
	$('#footTabBar a').on("click", function(e){

		e.preventDefault();

		app.log("footTabBar a onClick event" ,"app.events.footBarOnClick");

		var current = $('#footTabBar a.current');
		var target = $(e.target).data("target");
		var targetPage = $("#" + target +"Page");
		var currentPage = $("#" + current.data("target") +"Page");

		// check if the new target is not the current
		if(current.data("target") == target){
			app.log("the current tab equals to the target one" , "app.events.footBarOnClick");
		} else {
			if(app.isAnimation){
				animation();
			} else {
				currentPage.hide();
				targetPage.show();
				current.removeClass("current");
				$(e.target).addClass("current");
			}

		}
		function animation(){
			// for devices use window.screen.height
			var deviceHeight = $(window).height();
			var footMenuBarHeight = $("#footTabBar").height();
			var targetHeight = deviceHeight - footMenuBarHeight;

			targetPage.css("top" , targetHeight).css("z-index" , -1);

			var str = '0,-' + targetHeight + 'px,10px';

			targetPage.show();

			var cleanup = function(){
				app.events.cleanupAnimation(
					current , $(e.target) , currentPage , targetPage ,
					"animation has ended" , "app.events.footBarOnClick"
				);
			};
			targetPage.anim({ translate3D: str}, 0.6, 'ease-out', cleanup);
		}
	});
};
 
app.events.mainPageHeadBarOnClick = function(){
	$('#headTabBar a').on("click", function(e){

		e.preventDefault();

		app.log("headTabBar a onClick event" ,"app.events.mainPageHeadBarOnClick");

		var current = $('#headTabBar a.current');
		var target = $(e.target).data("target");
		var targetPage = $("#mainPage" + target);
		var currentPage = $("#mainPage" + current.data("target"));

		// check if the new target is not the current
		if(current.data("target") == target){
			app.log("the current tab equals to the target one" , "app.events.footBarOnClick");
		} else {
			if(currentPage.length == 0){
				currentPage = $("#mainPageIndex");
			}
			if(app.isAnimation){
				animation();
			} else {
				currentPage.hide();
				targetPage.show();
				current.removeClass("current");
				$(e.target).addClass("current");
			}
		}

		function animation(){
			// for devices use window.screen.height
			var deviceHeight = $(window).height();
			var footMenuBarHeight = $("#footTabBar").height();
			var headerHeight = $("header").height();

			var menuHeight = $("#headTabBar").height();
			var offset = currentPage.offset().top - menuHeight - headerHeight;

			var targetTop = deviceHeight - footMenuBarHeight - menuHeight - offset * 2;
			var str = '0,-' + targetTop + 'px,10px';
			targetPage.css("top" , deviceHeight - footMenuBarHeight);

			targetPage.show();

			var cleanup = function(){
				app.events.cleanupAnimation(
					current , $(e.target) , currentPage , targetPage ,
					"animation has ended" , "app.events.mainPageHeadBarOnClick"
				);
			};
			targetPage.anim({ translate3D: str}, 0.6, 'ease-out', cleanup);
		}

	});
};
app.events.cleanupAnimation = function(currentMenu , targetMenu , currentPage , targetPage , logMsg , logContext){
	// set the footBar menu new state
	currentMenu.removeClass("current"); 
	targetMenu.addClass("current");

	// set the app pages in the new state
	currentPage.removeClass("current").attr('style' , '');
	targetPage.addClass("current").attr('style' , '');

	app.log(logMsg , logContext);
};
