
app.events = {};

app.events.runAll = function(){
	app.events.footBarOnClick();
	app.events.mainPageHeadBarOnClick();
	app.events.mainPageSearchBarOnClick();
	app.server.translateLanguages(app.executeViews);
	app.events.selectToLanguageOnFocus();
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
		app.log(e,e);
		app.log("headTabBar a onClick event" ,"app.events.mainPageHeadBarOnClick");


		var current = $('#headTabBar a.current');
		var target = $(e.target).data("target");
		var targetPage = $("#mainPage" + target);
		var currentPage = $("#mainPage" + current.data("target"));
		// check if the new target is not the current
		if(current.data("target") == target){
					app.log("the current tab equals to the target one" , "app.events.HeadBarOnClick");
		}
		else { //incase this is a new target
			switch(target){
				case "Search":
					//check if we already have the results for this search string
					if (typeof app.lastResult.search.text !='undefined' && app.lastResult.search.text!=app.lastClip.text)
						app.server.search(afterData);
					break;
				case "Translate":
					//check if we already have the results for this Translte
					if (typeof app.lastResult.translate.text !='undefined' && app.lastResult.translate.text!=app.lastClip.text)
						app.server.translate(app.user.defaultTranslateLang ,afterData);
					break;
				case "Hear":
					app.server.hear(afterData);
					break;
				default :
					break;
			}
			currentPage.hide();
			targetPage.show();
			current.removeClass("current");
			$(e.target).addClass("current");
		}
		function afterData(r){

				switch(target){
					case "Search":
						app.lastResult.search.text = app.lastClip.text;
						app.lastResult.search.data = r;
						$('#mainPageSearch > div.searchResults').innerHTML=""; // clears all the previous search result divs - maybe you have a better solution
						app.executeViews("#searchPageWeb" ,app.views.main.search.template.web ,app.lastResult.search.data);
						app.executeViews("#searchPageImage" ,app.views.main.search.template.image ,app.lastResult.search.data);
						app.executeViews("#searchPageVideo" ,app.views.main.search.template.video ,app.lastResult.search.data);
						console.log(app.lastResult.search.data);
						break;
					case "Translate":
						app.lastResult.translate.text = app.lastClip.text;
						app.lastResult.translate.data = r;
						$('#mainPageTranslate > div.translateResults').innerHTML=""; // clears all the previous search result divs - maybe you have a better solution
						app.executeViews("#translateResults" ,app.views.main.translate.template ,app.lastResult.translate.data);
						console.log(app.lastResult.translate.data);
						break;

					default :
						console.log("case default");
						break;
				}

				if(currentPage.length == 0){
					currentPage = $("#mainPageIndex");
				}



			}

	});
};

app.events.mainPageSearchBarOnClick = function () {
	$('#searchTabBar a').on("click", function(e){
		app.log(app.lastClip.text , app.lastResult.search.text);
		e.preventDefault();
		//checking if the click was pressed after a new string was copied
		if ( (!app.lastClip.text) && (app.lastResult.search.text!=app.lastClip.text)) {
			app.log("testing" , app.lastResult.search.text);
			app.server.search(afterData);
			// we need to solve how exactly we will send the request and how we will present it.
		}
		else { // incase this is the same search and we just need to show the requested tab

			app.log("SearchTabBar a onClick event" ,"app.events.searchBarOnClick");
			var current = $('#searchTabBar a.current');
			var target = $(e.target).data("target");
			app.log(current.data("target") ,"fuckme");
			var targetPage = $("#searchPage" + target);
			var currentPage = $("#searchPage" + current.data("target"));
			if(current.data("target") == target){
						app.log("the current tab equals to the target one" , "app.events.HeadBarOnClick");
			}
			else
			{
				currentPage.hide();
				targetPage.show();
				current.removeClass("current");
				$(e.target).addClass("current");
			}
		}
	});
};
app.events.selectFromLanguageOnFocus = function () {

		var previous;

		$("#fromLanguage").on("focus",function (e) {
			alert("bitch");
			e.preventDefault();
			// Store the current value on focus, before it changes
			previous = this.value;
		}).change(function() {
			// Do something with the previous value after the change
			var r = confirm("Are you sure the Origin Language is incorrect?");
			if (r) {}
			else {

			}


		});
};
app.events.selectToLanguageOnFocus = function () {

		var previous;

		$("#toLanguage").on("focus",function (e) {
			alert("bitch");
			e.preventDefault();
			// Store the current value on focus, before it changes
			previous = this.value;
		}).change(function() {
			// Do something with the previous value after the change
			var r = confirm("Are you sure the Origin Language is incorrect?");
			if (r) {}
			else {

			}


		});
};
