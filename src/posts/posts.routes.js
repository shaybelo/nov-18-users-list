const {app} = require('../app');

const {
	getPosts,
	createPost,
	deletePost,
	getPostById,
	updatePostById
} = require('./posts');


app.get('/posts', (req, res) => {
	const posts = getPosts();
	res.send(posts);
});

app.post('/posts', (req, res) => {
	try {
		const posts = createPost(req.query);
		res.send(posts);
	} catch (e) {
		res.status(409);
		res.send(e.message);
	}
});

app.delete('/posts/:id', (req, res) => {
	const posts = deletePost(req.params.id);
	res.send(posts);
});

app.get('/posts/:id', (req, res) => {
	const post = getPostById(req.params.id);
	res.send(post);
});

app.put('/posts/:id', (req, res) => {
	const post = updatePostById(req.params.id, req.query);
	res.send(post);
});











