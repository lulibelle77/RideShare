var scripts = {
	common: [
	//vendors
	'./js/vendors/parse-1.4.2.min.js',
	'./js/vendors/jquery-2.1.4.min.js',
	'./js/vendors/bootstrap.min.js',
	'./js/vendors/handlebars-latest.js',
	'./js/vendors/moment.js',
	'./js/views/conversationList.js',
	


	models: [
	//models
	'./js/models/MyParseUser.js',
	'./js/models/MyParseMessage.js'
	],

	// modules
	'./js/modules/location.js',

	web: [];

	//Views
	'./js/views/registration.js',
	'./js/views/login.js'
	'./js/views/conversation.js',
	'./js/views/reset.js',
	]
};


app.core = {
	initialize: function() {
		$LAB.script(scripts.common).wait()
		.script(scripts.models).wait(app.core.afterload);
		},
	afterload: function() {
	//Initialize this Parse application
	Parse.initialize('RideShareCloud', 'unused');
	Parse.serverURL = 'https://parseapi.back4app.com',
	//Protect Access
	app.core.accessControl();
	//Init Global Events();
	app.core.globalEvents();
	//Initialize View
	if (config.view in app) {
		app[config.view].initialize();
	}
	},
	accessControl: function() {
	//user is logged in and accessing a public view
	if (MyParseUser.current() && config.public_access) {
		window.location.href = 'logout.html';
		return;
	}
	//user is not logged in and trying to access protected view
	if (!MyParseUser.current() && !config.public_access {
		window.location.href = login.html';
		return;
	}
	//Do not add navbar for logged out users
	if (!MyParseUser.current()) {
		return;
	}
	// Add Navbar
	$.ajax({
		url: "navbar.html",
		async: false
		}).done(function(source {
			var template=Handlebars.compile(source);
			$('body').prepend(template(config).addClass('has-navbar);
	}
	getParameterByName: function(name) {
	var results = new RegExp('[\\?&]' +name+ '([^&#]*)').exec(window.location.href);
		if (!results) {
			return 0;
		}
		return results[1] || 0;
	}
);	
	},
	render: function(target, template_name, data) {
		var source = $W("#" + template_name + "template").html();
		var template = Handlebars.compile(source);
		$(target).html(template(data));
	},
	globalEvents: function() {}
};
