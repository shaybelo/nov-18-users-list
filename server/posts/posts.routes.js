const { Router } = require('express');

const {
	getPosts,
	createPost,
	deletePost,
	getPostById,
	updatePostById,
	getPostsByUserId
} = require('./posts');

const route = Router();

route.get('/posts', (req, res) => {
	if (req.query.userId) {
		const posts = getPostsByUserId(req.query.userId);
		res.send(posts);
	} else {
		const posts = getPosts();
		res.send(posts);
	}
});

route.post('/posts', (req, res) => {
	try {
		const posts = createPost(req.query);
		res.send(posts);
	} catch (e) {
		res.status(409);
		res.send(e.message);
	}
});

route.delete('/posts/:id', (req, res) => {
	const posts = deletePost(req.params.id);
	res.send(posts);
});

route.get('/posts/:id', (req, res) => {
	const post = getPostById(req.params.id);
	res.send(post);
});

route.put('/posts/:id', (req, res) => {
	const post = updatePostById(req.params.id, req.query);
	res.send(post);
});

module.exports = {
	route
};











