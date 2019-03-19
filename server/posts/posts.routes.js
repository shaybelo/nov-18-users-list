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

route.get('/posts', async (req, res) => {
	if (req.query.userId) {
		const posts = await getPostsByUserId(req.query.userId);
		res.send(posts);
	} else {
		const posts = await getPosts();
		res.send(posts);
	}
});

route.post('/posts', async (req, res) => {
	try {
		const posts = await createPost(req.body);
		res.send(posts);
	} catch (e) {
		res.status(409);
		res.send(e.message);
	}
});

route.delete('/posts/:id', async (req, res) => {
	const posts = await deletePost(req.params.id);
	res.send(posts);
});

route.get('/posts/:id', async (req, res) => {
	const post = await getPostById(req.params.id);
	res.send(post);
});

route.put('/posts/:id', async (req, res) => {
	const post = await updatePostById(req.params.id, req.query);
	res.send(post);
});

module.exports = {
	route
};











