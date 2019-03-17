const fs = require('fs');
const uuid = require('uuid');

function writeFile(content) {
	fs.writeFileSync('./postsList.json', JSON.stringify(content));
}

function getPosts() {
	return require('./postsList.json');
}

function createPost({ userId, title, body }) {
	const posts = getPosts();

	posts.unshift({
		userId, title, body, id: uuid()
	});


	return posts;
}

function deletePost(id) {
	let posts = getPosts();

	posts = posts.filter(post => post.id != id);

	writeFile(posts);

	return posts;
}

function getPostById(id) {
	const posts = getPosts();
	const post = posts.find(post => post.id == id);
	return post;
}

function updatePostById(id, { userId, title, body }) {
	const posts = getPosts();

	const post = posts.find(post => post.id == id);
	post.userId = userId;
	post.title = title;
	post.body = body;

	writeFile(posts);

	return post;
}

function getPostsByUserId(userId) {
	const posts = getPosts();
	return posts.filter(post => post.userId == userId);
}

module.exports = {
	getPosts,
	createPost,
	deletePost,
	getPostById,
	updatePostById,
	getPostsByUserId
};