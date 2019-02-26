const { Router } = require('express');

const {
	getUsers,
	createUser,
	deleteUser,
	getUserById,
	updateUserById
} = require('./users');

const {
	getPostsByUserId,
	createPost
} = require('../posts/posts');

const route = Router();

route.get('/users', async (req, res) => {
	const { MongoClient } = require('mongodb');

	// Connection URL
	const url = 'mongodb://localhost:27017';

	try {
		// Use connect method to connect to the server
		const connection = await MongoClient.connect(url);

		const database = connection.db('nov-18');
		const usersCollection = database.collection('users');
		const result = await usersCollection.find({}).toArray();

		res.send(result);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

route.post('/users', (req, res) => {
	try {
		const users = createUser(req.body);
		res.send(users);
	} catch (e) {
		res.status(409);
		res.send(e.message);
	}
});

route.delete('/users/:id', (req, res) => {
	const users = deleteUser(req.params.id);
	res.send(users);
});

route.get('/users/:id', (req, res) => {
	const user = getUserById(req.params.id);
	res.send(user);
});

route.put('/users/:id', (req, res) => {
	const user = updateUserById(req.params.id, req.body);
	res.send(user);
});

route.get('/users/:id/posts', (req, res) => {
	const posts = getPostsByUserId(req.params.id);
	res.send(posts);
});

route.post('/users/:id/posts', (req, res) => {
	const post = {
		...req.body,
		userId: req.params.id,
	};

	const posts = createPost(post);

	res.send(posts);
});

module.exports = {
	route
};










