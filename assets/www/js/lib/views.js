
app.views = {};

/* MAIN VIEW */
app.views.main = {};

app.views.main.template =
	'{{#content}}' +
		'<div id="{{id}}Page" class="mainPages {{#isMain}}{{myClass}}{{/isMain}}"  >'+
			'{{#isMain}}' +
				'<ul id="headTabBar">' + //to try to take it out and build a generic function.
					'{{#navBarContent}}' +
						'<li>' +
							'<a href="#"  data-target="{{target}}">{{label}}</a>' +
						'</li>' +
					'{{/navBarContent}}' +
				'</ul>' +

				'{{#pages}}' +
						'<div id="{{id}}" class="mainPageTabs {{#isIndex}}{{myClass}}{{/isIndex}}" >' +
						'{{#isSearchPages}}' + // Adding the divs inside the search: web,image,video
							'<ul id="searchTabBar">'+ // adding the ul for the headers
								'{{#searchBarContent}}' +
									'<li>' + //li headers and links
										'<a href="#"  data-target="{{target}}" class="{{#isIndex}}{{myClass}}{{/isIndex}}">{{label}}</a>' +
									'</li>' +
								'{{/searchBarContent}}' +
							'</ul>'+
			'				{{#searchPages}}'+ // the divs for the search
								'<div id="{{id}}" class="SearchPageTabs" class="{{#isIndex}}{{myClass}}{{/isIndex}}" ></div>' +
							'{{/searchPages}}' +
			'			{{/isSearchPages}}'+
						'{{#isTranslatePages}}' +
							'<div id="translateOptions"></div>' +
							'<div id="translateResults" class="translateResults"></div>'+
						'{{/isTranslatePages}}' +
						'</div>{{/pages}}' +
			'{{/isMain}}' +
		'</div><div class="clear"></div>' +
	'{{/content}}';

app.views.main.vars = {
	content:[
		{
			id:"main",
			myClass:"current",
			isMain:true
		},{
			id:"appStore",
			isMain:false
		},{
			id:"feedback",
			isMain:false
		},{
			id:"more",
			isMain:false
		}
	],
	pages :[
		{
			id: "mainPageIndex",
			myClass: "current",
			isIndex: true
		},{
			id: "mainPageTranslate",
			isIndex: false,
			isTranslatePages:true
		},{
			id: "mainPageHear",
			isIndex: false
		},{
			id: "mainPageSearch",
			isIndex: false,
			isSearchPages:true
		},{
			id: "mainPageSocial",
			isIndex: false
		}
	],
	searchPages:[
		{
			id: "searchPageWeb",
			class:"searchResults" ,
			myClass: "current",
			isIndex: true
		},{
			id: "searchPageImage",
			class:"searchResults" ,
			isIndex: false
		},{
			id: "searchPageVideo",
			class:"searchResults" ,
			isIndex: false
		}
	],
	navBarContent:[
			{
				target:"Translate",
				label:"Translate"

			},{
				target:"Search",
				label:"Search"
			},{
				target:"Hear",
				label:"Hear"
			},{
				target:"Social",
				label:"Social"
			}
		],
	searchBarContent:[
			{
				target:"Web",
				label:"Web",
				myClass:"current",
				isIndex:true
			},{
				target:"Image",
				label:"Images",
				isIndex:false
			},{
				target:"Video",
				label:"Videos",
				isIndex:false
			}
	]
};
app.views.main.translate = {};
app.views.main.translate.template= 	"{{text}}";
app.views.main.translate.optionTemplate= 	'<select id="fromLanguage" name="fromLanguage">' +
													'<option value="">Auto Detect</option>'+
												'{{#Languages}}' +
													'<option value={{Code}}>{{Name}}</option>'+
												'{{/Languages}}' +
											'</select>'+
											'<select id="toLanguage" name="toLanguage">' +
												'{{#Languages}}' +
													'<option value={{Code}} label={{Name}}>{{Name}}</option>'+
												'{{/Languages}}' +
											'</select>';

app.views.main.search = {};
app.views.main.search.template = {};
app.views.main.search.template.web= /*"<div id='searchPageWeb' class='searchResults'>*/ "{{#web}}" +
											"<ul><a href=\"#\"  onclick=\"window.plugins.childBrowser.showWebPage({{Url}}, { showLocationBar: true });\" >{{Title}}</a>" +
												"<li>{{Description}}</li>" +
												"<li>{{DisplayUrl}}</li>" +
											"</ul>{{/web}}" /*+
										"</div>"*/;
app.views.main.search.template.image= 	/*"<div id='searchPageImage' class='searchResults'>*/"{{#image}}" +
											'<a href="' +'{{MediaUrl}}"><img src="' + '{{Thumbnail.MediaUrl}}" /></a>'+
											"{{/image}}" /*+
										"</div>"*/;
app.views.main.search.template.video= 	/*"<div id='searchPageVideo' class='searchResults'>*/"{{#video}}{{#MediaUrlFlag}}" +
											'<a href="' +'{{MediaUrl}}"><img src="' + '{{Thumbnail.MediaUrl}}" alt="' +'{{Title}}"/></a>'+
											"{{/MediaUrlFlag}}{{/video}}" /*+
										"</div>"*/;

/* FOOTER BAR VIEW */
app.views.footBar = {};

app.views.footBar.template =
	'<ul id="footTabBar">' +
		'{{#content}}' +
			'<li>' +
				'<a href="#"  data-target="{{target}}" {{#isMain}} class="{{myClass}}" {{/isMain}}>{{label}}</a>' +
			'</li>' +
		'{{/content}}' +
	'</ul>';

app.views.footBar.vars = {
	content:[
		{
			target:"main",
			label:"main",
			myClass:"current",
			isMain:true
		},{
			target:"feedback",
			label:"feedback",
			isMain:false
		},{
			target:"more",
			label:"more",
			isMain:false
		}
	]
};
/*DIALOG MODULE VIEW*/

app.views.dialog = {};

app.views.dialog.template = '<div id="dialog-overlay"></div>' +
							'<div id="dialog-box">' +
								'{{html}}' +
							'</div>';