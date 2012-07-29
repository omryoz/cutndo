app.server ={};
app.server.url = "http://www.highlight-me.com/app/service";
app.server.addNewUser = function(uuid ,platform ,version ,name){
	app.log("send a request to the server to add a new active user" , "app.server.addNewUser");
	// add the user to the server
	var url = app.server.url + '?action=register&uuid=' + app.user.uuid() + "&version=" + app.user.version() + "&platform=" + app.user.platform() + "&name=" + app.user.name();
	$.ajax({
		type : "get",
		url :url,
		success :function(data){
			console.log("app.server.addNewUser succses");
		},
		error: function(xhr, type){
			alert('Ajax error!');
		}
	});

};
app.server.search = function(callback){

	app.log("execute" , "app.server.search");
	var url = app.server.url + '?callback=?&action=compositeSearch&uuid=' + app.user.uuid() + '&text=' + encodeURIComponent(app.lastClip.text);
	console.log(url);
	$.ajaxJSONP({
		url: url,
		success: function(data){
			console.log("success");
			callback(data);
	  	},
		error : function(xhr, errorType, error){
			console.log(xhr);
			console.log(errorType);
			console.log(error);
		},
		complete : function(){
			console.log("complete");
		}
	});

};
app.server.translate = function(to ,callback){
	app.log("execute" , "app.server.translate");
	from = (!app.user.defaultOriginLang)  ? "" :'&from='+app.user.defaultOriginLang;
	var url = app.server.url + '?callback=?&action=translate&uuid=' + app.user.uuid() + '&text=' + encodeURIComponent(app.lastClip.text) + from +'&to=' + to;
	app.user.defaultOriginLang=null;
	console.log(url);
	$.ajaxJSONP({
		url: url,
		success: function(data){
			app.log("success" , "app.server.translate $.ajaxJSONP");
			callback(data);
		},
		error : function(xhr, errorType, error){
			console.log(xhr);
			console.log(errorType);
			console.log(error);
		},
		complete : function(){}
	});
};

app.server.hear = function(callback){
	window.plugins.tts.speak(app.lastClip.text,
		function(r){
			// check if current clip is not an empty JSON object
			app.log("speaking the selected text" , "app.server.hear");
		},
		function(e){console.log(e);}
	);
};
app.server.translateLanguages = function(){
	app.log("execute" , "app.server.translate");
	var url = app.server.url + '?callback=?&action=getLanguagesForTranslation&uuid=' + app.user.uuid();
	console.log(url);
	$.ajaxJSONP({
		url: url,
		success: function(data){
			app.log("success" , "app.server.translate $.ajaxJSONP");
			app.translateLanguages=data;
			app.executeViews("#translateOptions" ,app.views.main.translate.optionTemplate ,app.translateLanguages,app.server.selectLanguagesInit);

		},
		error : function(xhr, errorType, error){
			console.log(xhr);
			console.log(errorType);
			console.log(error);
		},
		complete : function(){}
	});
};
app.server.translatetoLanguageSetDefault = function(defaultValue) {
	if(typeof defaultValue == "undefined")
		defaultValue = app.user.defaultTranslateLang;
	app.log("what the fuck" , "what the fuck");
	$('#toLanguage option[value='+defaultValue+']').attr('selected','selected');
};
app.server.social = function(){};

app.server.selectLanguagesInit = function() {
	app.server.translatetoLanguageSetDefault();
	app.events.selectLanguageOnFocus();

};
