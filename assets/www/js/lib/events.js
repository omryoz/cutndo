
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
			currentPage.hide();
			targetPage.show();
			current.removeClass("current");
			$(e.target).addClass("current");

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

		switch(target){
			case "Search":
				app.server.search(afterData);
				break;
			case "Translate":
				app.server.translate(app.user.defaultTranslateLang ,afterData);
				break;
			case "Hear":
				app.server.hear(afterData);
				break;
			default :
				break;
		}

		function afterData(r){

			switch(target){
				case "Search":
					app.lastResult.search.text = app.lastClip.text;
					app.lastResult.search.data = r;
					app.executeViews("#mainPageSearch" ,app.views.main.search.template ,app.lastResult.search.data);
					console.log(app.lastResult.search.data);
					break;
				case "Translate":
					app.lastResult.translate.text = app.lastClip.text;
					app.lastResult.translate.data = r;
					app.executeViews("#mainPageTranslate" ,app.views.main.translate.template ,app.lastResult.translate.data);
					console.log(app.lastResult.translate.data);
					break;

				default :
					console.log("case default");
					break;
			}


			// check if the new target is not the current
			if(current.data("target") == target){
				app.log("the current tab equals to the target one" , "app.events.footBarOnClick");
			} else {

				if(currentPage.length == 0){
					currentPage = $("#mainPageIndex");
				}
				currentPage.hide();
				targetPage.show();
				current.removeClass("current");
				$(e.target).addClass("current");

			}
		}
	});
};

