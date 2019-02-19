const { Router } = require('express');

const {
	getUsers,
	createUser,
	deleteUser,
	getUserById,
	updateUserById
} = require('./users');

const route = Router();

route.get('/users', (req, res) => {
	const users = getUsers();
	res.send(users);
});

route.post('/users', (req, res) => {
	try {
		const users = createUser(req.query);
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
	const user = updateUserById(req.params.id, req.query);
	res.send(user);
});

module.exports = {
	route
};










