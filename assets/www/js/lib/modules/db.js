// local storage
app.localStorage = {};
// set's FirstUse , LastUse vars.
app.localStorage.setMainFlowVars = function(){
	// first run
	if (app.localStorage.getVar("FirstUse") === null) {
		app.localStorage.setVar("FirstUse", true);
		app.log("set FirstUse to true: " + app.localStorage.getVar("FirstUse"),"setMainFlowVars");
	}
	app.localStorage.setVar("LastUse", Math.round((new Date()).getTime() / 1000));
	app.log("set LastUse to this UNIX Timestamp: " + app.localStorage.getVar("LastUse"),"setMainFlowVars");
};
// get local variables value by key
app.localStorage.getVar = function(key){
	var ret = localStorage.getItem(app.strings.appName + key);
	app.log("returning variable from localStorage key: " + key + " value: " + ret,"getVar");
	return ret;
};
// set local variables by key and value
app.localStorage.setVar = function(key , value){
	app.log("set variable on localStorage key: " + key + " value: " + value,"setVar");
	localStorage.setItem(app.strings.appName + key, value);
};

// local SQLite
app.localSqlite = {};

app.localSqlite.acceptableDelay = 3600;
// todo check if acceptance delay is working
app.localSqlite.isNewClip = function(clipTime){
	app.log("checking is the clip that we have is new (less then one hour)" , "app.localSqlite.isNewClip");
	var currentTimestamp = Math.round((new Date()).getTime() / 1000);
	clipTime = clipTime/1000;
	return (currentTimestamp - clipTime < app.localSqlite.acceptableDelay);
};

app.localSqlite.addClip = function(clip ,callback){
	app.log("addClip : " + clip , "app.localSqlite.addClip");
	// add the clip to the sqlite database
	window.plugins.clip.addClip(clip,
		function(r){
			app.log("success" , "app.localSqlite.addClip");
			callback();
		},
		function(e){console.log(e);}
	);
};

app.localSqlite.getClip = function(type , callback){
	app.log("getClip return a clip of type: " + type , "app.localSqlite.getClip");
	var ret = null;
	switch(type){
		case "all":
			break;
		case "last":
			if(app.isMobile){
				window.plugins.clip.getLastClip("",
					function(r){
						// check if current clip is not an empty JSON object
						if( typeof r.clips[0] != "undefined" ){
							ret = r.clips[0];
							callback(ret);
						} else {
							var innerCallback = function(){
								app.localSqlite.getClip("last" ,callback);
							};
							app.localSqlite.addClip({"text" : "the demo text"} ,innerCallback);
						}
						app.log("getLastClip returning last clip" , "app.localSqlite.getClip");
					},
					function(e){console.log(e);}
				);
			} else {

				callback({"id" : 1 , "text" : "hello world" , "time" : "1338904920"});
				app.log("getLastClip returning last clip" , "app.localSqlite.getClip");
			}
			break;
		case "demo":
			return {"text" : "the demo text" , "time" : Math.round((new Date()).getTime() / 1000)};
			break;
		default :
			break;
	}
};