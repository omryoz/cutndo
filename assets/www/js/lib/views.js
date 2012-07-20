
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
										'<a href="#"  data-target="{{target}}">{{label}}</a>' +
									'</li>' +
								'{{/searchBarContent}}' +
							'</ul>'+
			'				{{#searchPages}}'+ // the divs for the search
								//'<div id="{{id}}" class="SearchPageTabs {{#isIndex}}{{myClass}}{{/isIndex}}" ></div>' +
							'{{/searchPages}}' +
			'			{{/isSearchPages}}'+
						'{{id}}</div>{{/pages}}' +
			'{{/isMain}}' +
		'{{id}}</div><div class="clear"></div>' +
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
			id:"settings",
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
			isIndex: false
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
			myClass: "current",
			isIndex: true
		},{
			id: "searchPageImage",
			isIndex: false
		},{
			id: "searchPageVideo",
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
				target:"WebSearch",
				label:"Web"

			},{
				target:"ImageSearch",
				label:"Images"
			},{
				target:"VideoSearch",
				label:"Videos"
			}
	]
};
app.views.main.translate = {};
app.views.main.translate.template= "<div id='translate_results' class='translateResults'>{{text}}</div>";

app.views.main.search = {};
app.views.main.search.template = {};
app.views.main.search.template.web= "<div id='searchPageWeb' class='searchResults'>{{#web}}<ul>{{Title}}<li>{{Description}}</li><li>{{DisplayUrl}}</li></ul>{{/web}}</div>";
app.views.main.search.template.image= "<div id='searchPageImage' class='searchResults'>{{#image}}<ul>ImageURL:{{MediaUrl}}<li>ThumbNail:{{Thumbnail.MediaUrl}}</li></ul>{{/image}}</div>";
app.views.main.search.template.video= "<div id='searchPageVideo' class='searchResults'>{{#video}}{{#MediaUrlFlag}}<ul>{{Title}} <li>MediaUrl:{{MediaUrl}}</li><li>ThumbNail:{{Thumbnail.MediaUrl}}</li></ul>{{/MediaUrlFlag}}{{/video}}</div>";



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
			target:"appStore",
			label:"app store",
			isMain:false
		},{
			target:"feedback",
			label:"feedback",
			isMain:false
		},{
			target:"settings",
			label:"settings",
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