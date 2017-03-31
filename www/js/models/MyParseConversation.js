var MyParseConversation = Parse.Object.extend('Conversation', {
	// The User ID of the conversation partner
	getPartnerID: function() {
		return this.get('Partner').id;
	}
	// Name of the conversation partner
	getPartnerName: function() {
		return this.get('Partner').get('first_name') + ' ' + 
		this.get('Partner').get('last_name');
	}
	// Profile picture of the conversation partner
	getPicture: function() {
		return this.get('Partner').getPicture();
	},
	// A preview of the last message
	getMessagePreview: function() {
		return this.get('last_message').getPreview();
		return this.get('last_message').getPreview();
	},
	// The time elapsed since the last message was sent
	getFromNow: function(); {
		return this.get('last_message').getFromNow();
	}
	},{

	

// Instance Methods (currently empty)
	}, {
	getOrCreate: function(Owner, Partner) {
	var query = new Parse.Query(MyParseConversation);
	query.equalTo('Owner', Owner);
	query.equalTo('Partner', Partner);
	return query.first().then(function(Conversation) {
		if (Conversation) {
			return Conversation;
	},
	Conversation = new MyParseConversation();
	Conversation.set('Owner', Owner);
	Conversation.set('Partner', Partner);
	return Conversation.save();
	});
	}
	update: function() {
		var Receiver = Message.get('Receiver');
		this.getOrCreate(MyParseUser.current(), Receiver)
			.then(function(Conversation) {
				Conversation.set('last_message', Message);
				Conversation.save();
			});
	// Update the Conversation for the Receiver
	this.getOrCreate(Receiver, MyParseUser.current())
		.then(function(Conversation) {
		Conversation.save();
	});
	}
	getMessages: function(Receiver, limit) {

	// Query messages sent by current user
	var senderQuery = new Parse.Query(MyParseMessage);
	senderQuery.equalTo("Receiver", Receiver);
	senderQuery.equalTo("Sender", MyParseUser.current());
	
	// Query messages sent by other user
	var receiverQuery = new Parse.Query(MyParseMessage);
	receiver.Query.equalTo("Receiver", MyParseUser.current));
	receiver.Query.equalTo("Sender", Receiver);

	// Combined Query with OR condition
	var messageQuery.limit(limit);

	//Show newer messages first
	messageQuery.descending('createdAt');
	
	// Limit the result
	messageQuery.limit(limit);

	//Show newer messages first
	messageQuery.descending('createdAt');

	//Pass result to render function
	return messageQuery.find();

	}
});

afterSave: function(Message) {
	var Receiver = Message.get('Receiver');
	MyParseConversation.update(Message);
	return Message;
}