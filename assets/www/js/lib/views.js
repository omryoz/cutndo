
app.views = {};

/* MAIN VIEW */
app.views.main = {};

app.views.main.template =
	'{{#content}}' +
		'<div id="{{id}}Page" class="mainPages {{#isMain}}{{myClass}}{{/isMain}}"  >'+
			'{{#isMain}}' +
				'<ul id="headTabBar">' +
					'{{#navBarContent}}' +
						'<li>' +
							'<a href="#"  data-target="{{target}}">{{label}}</a>' +
						'</li>' +
					'{{/navBarContent}}' +
				'</ul>' +

				'{{#pages}}' +
						'<div id="{{id}}" class="mainPageTabs {{#isIndex}}{{myClass}}{{/isIndex}}" >{{id}}</div>' +
				'{{/pages}}' +
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
			isIndex: false
		},{
			id: "mainPageSocial",
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
		]
};

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