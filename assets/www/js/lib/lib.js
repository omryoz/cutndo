app.lib = {};

 
 
 
app.lib.showDemo = function(callback){
	app.log("showDemo: inside" ,"app.lib.showDemo");
	$("#wrapper").css("background" , "red");
	setTimeout(callback , 8000);
};

app.lib.firstFlow = function(){
	app.log("firstFlow: checking value of FirstUse" , "app.lib.firstFlow");
	app.lib.showDemo(function(){
		app.localStorage.setVar("FirstUse" , false);
		afterDemo();
	});
	function afterDemo(){
		app.log("afterDemo: inside" , "app.lib.firstFlow");

		// todo check the handle of this statement
		if( ! app.localSqlite.isNewClip(app.lastClip.time)){

			var addClipCallback = function(){
				var getClipCallback = function(r){
					app.lastClip = r;
				};
				app.localSqlite.getClip("last" ,getClipCallback);
			};
			app.localSqlite.addClip({"text" : "the demo text"} ,addClipCallback);
		}
		app.server.addNewUser(app.user.uuid() ,app.user.platform() ,app.user.version() ,app.user.name());
		app.lib.mainFlow();
		$("#wrapper").css("background" , "");
	}
};

app.lib.mainFlow = function(){
	app.log("mainFlow: execute" ,"app.lib.mainFlow");

	app.executeViews("#mainContainer" ,app.views.main.template ,app.views.main.vars);
	app.executeViews("footer" ,app.views.footBar.template ,app.views.footBar.vars);

	if(app.lib.isAndroidVer2Plus && app.lib.isNotificationUse){
		app.lib.serverUpdateFlow(app.lib.getNotificationAction());
	} else {
		app.lib.showActionMenu(app.lib.serverUpdateFlow);
	}
	app.events.runAll();
};

app.lib.serverUpdateFlow = function(action){
	app.log("serverUpdateFlow: execute the action: " + action , "app.lib.serverUpdateFlow");
	app.lib.showResult();
};

app.lib.getNotificationAction = function(){
	app.log("getNotificationAction: returning the notification action" , "app.lib.getNotificationAction");
	return "actionType";
};

app.lib.showActionMenu = function(callback){
	app.log("showActionMenu: execute" , "app.lib.showActionMenu");
	var innerCallback = function(){
		// if user clicked on button, the overlay layer or the dialogbox, close the dialog
		$('#dialog-overlay').click(function () {
			$('#dialog-overlay , #dialog-box').hide();
			return false;
		});
		if(typeof callback !== "undefined")
			callback();
	};
	app.dialog.run($('<h1>this is the test dialog :)</h1>'),innerCallback);


	/*
	navigator.notification.alert(
		'You are the winner!',  // message
		callback,               // callback
		'Game Over',            // title
		'Done'                  // buttonName
	);*/
	//app.log("showActionMenu: run the callback with user choice" , "app.lib.showActionMenu");
	//callback("userChoice");
};

app.lib.showResult = function(){
	app.log("showResult: execute" , "app.lib.showResult");
};
