const express = require('express');
const {
	getUsers,
	createUser,
	deleteUser,
	getUserById,
	updateUserById
} = require('./users');

const app = express();

app.get('/users', (req, res) => {
	const users = getUsers();
	res.send(users);
});

app.post('/users', (req, res) => {
	try {
		const users = createUser(req.query);
		res.send(users);
	} catch (e) {
		res.status(409);
		res.send(e.message);
	}
});

app.delete('/users/:id', (req, res) => {
	const users = deleteUser(req.params.id);
	res.send(users);
});

app.get('/users/:id', (req, res) => {
	const user = getUserById(req.params.id);
	res.send(user);
});

app.put('/users/:id', (req, res) => {
	const user = updateUserById(req.params.id, req.query);
	res.send(user);
});


app.listen(8080);










