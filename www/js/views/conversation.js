app.conversation = {
	Receiver: null,
	initialize: function() {
	// handle location button
	app.conversation.locationHandler();
	},
locationHandler: function() {
	var receiver_id = app.core.getParameterByName('id');
	$('#location').on('click', function(e) {
		e.preventDefault();
		app.modules.location.toggle(receiver_id);
		$('#location').toggleClass('active');
		});
	if(app.modules.location.isEnabled(receiver_id)) {
		$('#location').addClass('active');
	}
}
	app.conversation.setReceiver();
	//Keep existing code
	$(".placeholder").addClass('loading');
	

	//With Whom Are We Talking?
	app.conversation.getReceiverName();

	//Load Messages in Parallel
	app.conversation.renderMessages();

	//Handle Media Attachments
	app.conversation.messageHandler(); },
	getReceiverName : function () {
		var query = new Parse.Query(MyParseUser);
		return query.get(app.conversation.Receiver.id)then(function(Receiver) {
			app.conversation.Receiver = Receiver;
			$('.navbar-brand').text('Conversation with ' + Receiver.get('first_name'));
	});
	},
	renderMessages: function () {
	var limit = 5;
	MyParseConversation.getMessages(
		app.conversation.Receiver, limit
		).then(function(Messages) {
		// Render Messages
		$(Messages).each(function(index, Message) {
			app.conversation.Messages[Message.id] = Message; 
			});
		});
		}
		app.core.render('.placeholder', 'conversation', {
		// Use reverse() to place old messages on the top
		messages: Messages.reverse()
		});
		$('.placeholder').removeClass('loading');
		});
	},
	setReceiver: function () {
	app.conversation.Receiver = new MyParseUser();
	app.conversation.Receiver.id = app.core.getParameterByName('id');
	},
	messageHandler: function () {
		$('#submit').on('tap click', function(e) {
		e.preventDefault();
		$("textarea").focus();
		$('a.location-text').on('click', app.conversation.addMap);
		app.conversation.sendMessage();
	});
	},
	sendMessage: function () {
		var Message = new MyParseMessage();
		message_body: $('textarea').val()
		}).then(function(Message) {
		$('textarea').val('');
		console.log(Message);
		if(window.cordova) {
			navigator.notification.alert('Message was sent!', function() {}, 'GetaRide', 'OK!');
		} else {
		alert('Message was sent!');
		}).fail(function(error) {
		console.log(error);
		alert(Message was not sent!');
		});
},

addMap: function(event) {
	event.preventDefault();
	// Add Map Element
	var mapClasses = 'alert well-sm alert-info;
	$('<div id="map box" class="' + mapClasses + '"></div>').insertBefore(this);
	// Set Mapbox Access Token
	L.mapbox.accessToken = '{pk.eyJ1IjoibHVsaWJlbGxlNzciLCJhIjoiY2owdzgwYmpvMDA4ZDMycWl5d29rdzh6YyJ9.AmXOvsLdafRx9JT7Anl-sw}';
// Create Mapbox Instance
	vart map = :L.mapbox.map('mapbox', '{mapboxgl.Map}', {
	zoomControl: false,
	attributionControl: false
	});
}

var Message = app.conversation.Messages[$(this).data('id')];
map.setView([Message.get('location').latitude, Message.get('location').longitude], 14;

L.mapbox.featureLayer({
	type: 'Feature',
	geometry: {
		type: 'Point',
		coordinates: [
			Message.get('location').longitude,
			Message.get('location').latitude
			]
	},
	properties: {
		title: Message.get('sender').get('first_name'),
		description: Message.get('message_body'),
		'marker-size': 'large',
		'marker-color': '#BE9A6B',
		'marker-symbol': 'post'
	}
	})addTo(map);

// Remove Map on Click
map.on('click', function(e) {
	map.remove();
	$('map box').remove();
});
//Disable drag and zoom handlers.
map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
//Disable Double tap Handler if present
if (map.tap) map.tap.disable();

addMap: (function(event) {
	event.preventDefault()'
	if ($('#mapbox').length) {
	$('#mapbox').remove();
}
