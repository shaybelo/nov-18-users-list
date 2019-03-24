const {Post} = require('./Posts.model');

async function getPosts() {
	return Post.find({}).populate('author');
}

async function createPost(postData) {
	const post = new Post(postData);
	await post.save();
	return post.populate('author');
}

async function deletePost(id) {
	return Post.findByIdAndDelete(id);
}

async function getPostById(id) {
	return Post.findById(id).populate('author');
}

async function updatePostById(id, post) {
	return Post.findByIdAndUpdate(id, post);
}

async function getPostsByUserId(userId) {
	// ??
}

module.exports = {
	getPosts,
	createPost,
	deletePost,
	getPostById,
	updatePostById,
	getPostsByUserId
};









