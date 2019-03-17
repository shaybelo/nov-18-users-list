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

const { MongoClient, ObjectID } = require('mongodb');

async function getUsersCollection() {
	const connection =
		await MongoClient.connect('mongodb://localhost:27017');

	const database = connection.db('nov-18');
	return database.collection('users');
}

route.get('/users', async (req, res) => {
	try {
		const users = await getUsers(req.query);
		res.send(users);
	} catch (e) {
		res.status(400);
		res.send(e.message);
	}
});

route.post('/users', async (req, res) => {
	try {
		const usersCollection = await getUsersCollection();
		const result = await usersCollection.insertOne(req.body);
		res.send(result);
	} catch (e) {
		res.status(409);
		res.send(e.message);
	}
});

route.get('/users/:id', async (req, res) => {
	try {
		const usersCollection = await getUsersCollection();
		const user = await usersCollection.findOne({ _id: ObjectID(req.params.id) });
		res.send(user);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

route.delete('/users/:id', async (req, res) => {
	try {
		const usersCollection = await getUsersCollection();
		const user = await usersCollection.deleteOne({ _id: ObjectID(req.params.id) });
		res.send(user);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

route.put('/users/:id', async (req, res) => {
	try {
		const usersCollection = await getUsersCollection();
		const user = await usersCollection
			.updateOne(
				{ _id: ObjectID(req.params.id) },
				{ $set: req.body }
			);
		res.send(user);
	} catch (e) {
		res.status(400).send(e.message);
	}
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










