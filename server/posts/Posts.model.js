const mongoose = require('mongoose');

mongoose.connect(
	'mongodb://localhost:27017/nov-18-mongoose',
	{ useNewUrlParser: true }
);

const Post = mongoose.model('Post', {
	title: {
		type: String,
		required: true,
	},
	body: String,
	creationDate: {
		type: Date,
		default: Date.now,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	}
});

module.exports = {
	Post,
};

