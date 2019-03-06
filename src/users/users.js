const fs = require('fs');
const uuid = require('uuid/v1');
const { MongoClient, ObjectID } = require('mongodb');

function writeFile(content) {
	fs.writeFileSync('./users.json', JSON.stringify(content));
}

async function getUsersCollection() {
	const connection =
		await MongoClient.connect('mongodb://localhost:27017');

	const database = connection.db('nov-18');
	return database.collection('users');
}

async function getUsers(query) {
	const usersCollection = await getUsersCollection();

	return usersCollection.find({
		name: new RegExp(query.name, 'i'),
		lastName: new RegExp(query.lastName, 'i'),
	}).toArray();
}

function createUser({ name, lastName }) {
	const users = getUsers();

	users.unshift({
		name,
		lastName,
		id: uuid()
	});


	return users;
}

function deleteUser(id) {
	let users = getUsers();

	users = users.filter(user => user.id != id);

	writeFile(users);

	return users;
}

function getUserById(id) {
	const users = getUsers();
	const user = users.find(user => user.id == id);
	return user;
}

function updateUserById(id, { name }) {
	const users = getUsers();

	const user = users.find(user => user.id == id);
	user.name = name;

	writeFile(users);

	return user;
}

module.exports = {
	getUsers,
	createUser,
	deleteUser,
	getUserById,
	updateUserById
};