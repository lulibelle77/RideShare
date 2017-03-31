app.modules.location = {
	isEnabled: function(receiver_id) {
	var key = 'location_' + receiver_id;
	return localStorage.getItem(key);
	}
	toggle: function:(receiver_id) {
		var key = 'location_' + receiver_id;
		return localStorage.setItem(key, !localstorage.getItem(key));
		return localStorage.getItem(key);
	}
};