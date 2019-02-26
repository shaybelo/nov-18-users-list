const fs = require('fs');
const uuid = require('uuid/v1');

function writeFile(content) {
	fs.writeFileSync('./users.json', JSON.stringify(content));
}

function getUsers() {
	return require('./users.json');
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