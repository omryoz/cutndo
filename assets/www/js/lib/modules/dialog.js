app.dialog = {};

app.dialog.run = function(html , callback){

	var innerCallback = function(){
		// get the screen height and width
		var maskHeight = $(window).height();
		var maskWidth = $(window).width();

		// calculate the values for center alignment
		var dialogTop =  (maskHeight/3) - ($('#dialog-box').height());
		var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);

		// assign values to the overlay and dialog box
		$('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
		$('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();
	};

	app.executeViews("#mainContainer" ,app.views.dialog.template ,{"html" : html} , innerCallback);

	callback()
};