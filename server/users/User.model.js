const mongoose = require('mongoose');


const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	height: {
		type:Number,
		min: 100,
		max: 250
	},
	registrationDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = {
	User,
};

