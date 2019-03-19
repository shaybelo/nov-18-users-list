const { MongoClient, ObjectID } = require('mongodb');

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
	}).toArray();
}

async function createUser(user) {
	const usersCollection = await getUsersCollection();
	return usersCollection.insertOne(user);
}

async function deleteUser(id) {
	const usersCollection = await getUsersCollection();
	return usersCollection.deleteOne({ _id: ObjectID(id) });
}

async function getUserById(id) {
	const usersCollection = await getUsersCollection();
	return usersCollection.findOne({ _id: ObjectID(id) });
}

async function updateUserById(id, user) {
	const usersCollection = await getUsersCollection();
	return usersCollection
		.updateOne(
			{ _id: ObjectID(id) },
			{ $set: user }
		);
}

module.exports = {
	getUsers,
	createUser,
	deleteUser,
	getUserById,
	updateUserById
};