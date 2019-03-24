const mongoose = require('mongoose');

mongoose.connect(
	'mongodb://localhost:27017/nov-18-mongoose',
	{ useNewUrlParser: true }
);

const UserSchema = mongoose.Schema({
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

const User = mongoose.model('User', UserSchema);

module.exports = {
	User,
	UserSchema
};

