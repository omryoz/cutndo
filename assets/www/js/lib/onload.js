
Zepto(function($){
	app.log("execute" , "Zepto onReady");
	// todo:display a gif until deviceReady is executed
	app.localStorage.setMainFlowVars();
	
});

if(app.isMobile){
	document.addEventListener("deviceready", onLoadFlow ,false);
	app.log("event execute" , "deviceready");
} else {
	document.addEventListener("DOMContentLoaded", onLoadFlow ,false);
	app.log("event execute" , "DOMContentLoaded");
}


function onLoadFlow(){

	var callback = function(r){

		app.lastClip = r;
		console.log(app.lastClip.text);

		if(app.localStorage.getVar("FirstUse") == "true"){
			// flow for first use
			app.lib.firstFlow();
		} else {
			// flow for second var
			app.lib.mainFlow();
		}
	};
	app.localSqlite.getClip("last", callback);
}
// todo handle the event on clipboard change update app.lastClip
