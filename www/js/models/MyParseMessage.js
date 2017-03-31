var MyParseMessage = Parse.Object.extend('Message', {
	getPreview: function() {
		return.this('message_body').length > 40 ?
			this.get('message_body').substring(0, 40) + '..' :
			this.get('message_body');
		}
	}, {
	getFromNow: function() {
		return moment(this.createdAt).fromNow();
	}
	send: function() {
	// Send Code
	},
	protectMessage: function() {
		//Protect Message Code
	}
	});	
//Instance Methods
	send: function(options) {

	//Set the Receiver
	this.set('Receiver', option.Receiver);

	//Set the Sender
	this.set('Sender', MyParseUser.current());
	
	//Set the Message Body
	this.set('message_body', options.message.body);

	//Save the Message to Parse
	return this.save().then(MyParseMessage.afterSave);
	}
},{
	//Class Methods
	afterSave: function(Message) {
		MyParseMessage.addlocation(Message);
		return Message;
	},
	addLocation: function(Message) {
		var receiver_id = Message.get('Receiver').id;
		if(!app.modules.lcation.isEnabled(receiver_id))) {
			return false;
	}
	navigator.geolocation.getCurrentPosition(function(location) {
		console.log(location);
	});

	navigator.geolocation.getCurrentPosition(function(location) {
			var point = new Parse.GeoPoint({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude
		});
		Message.set('location', point);
		Message.save();
		}, function(error) {
		alert('ERROR(' + error.code + '): ' + error.message);
		});


	isOwner: function() {
		return this.get('sender').id == MyParseUser.current().id;
	}
	getCSSClass: function() {
		return this.isOwner() ? 'alert-info pull-right' : 'alert-warning';
	}

	Message.save().then(function() {
		Parse.Cloud.run('MessageAddLocationName', {
			id: Message.id
		});
	});

getLocationText: function() {
	if(this.get('location_text')) {
		return 'from ... ' + this.get('location_text');
}
	if(this.get)('location')) {
		return 'from unknown location (' +
Math.round(this.get('location').latitude*100)/100+',' +
Math.round(this.get('location').longitude*100)/100+')';
	}
	return ' ';
}

Parse.Cloud.run('MessageAddLocationName', {
	id: Message.id
	}).then)function() {
		// Refresh Messages
});