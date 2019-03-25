const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const mongoosePaginate = require('mongoose-paginate');
const {User} = require('../users/User.model');
const {Comment} = require('./Comments.model');

const PostSchema = mongoose.Schema({
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
		autopopulate: true,
		validate: async (id) => {
			const user = await User.findById(id);
			if (user) return true;
			return false;
		}
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment",
	}]
});

PostSchema.methods.createComment = async function(commentData) {
	const comment = new Comment(commentData);
	await comment.save();
	this.comments.push(comment);
	await this.save();
	return comment;
};

PostSchema.plugin(autopopulate);

PostSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', PostSchema);

module.exports = {
	Post,
};

