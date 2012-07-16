var app = app || {};
/*
 todo: handel the situation when the program need to be updated (new version of software)
 todo: referrer: C:\Users\nemni\workspace\ClipPhoneGapPlugin\assets\www\js\lib\core.js
 */

/*APP VARS*/

app.body = document.getElementsByTagName('body')[0];

app.strings = {
	"appName"  : "Cut'ndo",
	"success"  : "function has run successfully!",
	"fail"     : "run filed"
};

app.lastClip = null;

/*user*/
app.user = {};
app.user.uuid = function(){ return (app.isMobile) ?  device.uuid :  "omryoz";};
app.user.platform = function(){ return (app.isMobile) ?  device.platform :  "platform string";};
app.user.version = function(){ return (app.isMobile) ?  device.version :  "version number";};
// todo: remind omry to add this filed ro the register user
app.user.name = function(){ return (app.isMobile) ?  device.name :  "device name";};


app.user.defaultTranslateLang = "es";

/*last result*/
app.lastResult = {};

app.lastResult.search = {};
app.lastResult.search.text = null;
app.lastResult.search.data = null;

app.lastResult.translate = {};
app.lastResult.translate.text = null;
app.lastResult.translate.data = null;

/*boolean values for correct flow*/
app.isProduction = false;
app.isAndroidVer2Plus = false;
app.isNotificationUse = false;
app.isAnimation = false;
app.isMobile = false;


/*APP FUNCTIONS*/

app.log = function(msg , context){

	$(app.strings).each(function(index, item){
		if(msg == index)
			msg = item;
	});

	if( ! app.isProduction)
		console.log(context + ": " + msg + " " + app.time());
};

app.executeViews = function(con ,template ,vars , callback){
	$(con).html($(con).html() + Mustache.to_html(template, vars));
	app.log("View has executed successfully" , "app.executeViews");
	app.log("html attached to: " + con , "app.executeViews");
	if(typeof callback !== "undefined")
		callback();
};

app.time = function(){
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	if (minutes < 10){
		minutes = "0" + minutes;
	}
	var seconds = currentTime.getSeconds();
	if (seconds < 10){
		seconds = "0" + seconds;
	}
	var miliSeconds = currentTime.getMilliseconds();
	if (miliSeconds < 10){
		miliSeconds = "0" + miliSeconds;
	}
	return hours + ":" + minutes + ":" +seconds + "(+" + miliSeconds + ")";
};