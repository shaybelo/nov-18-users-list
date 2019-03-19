const { MongoClient, ObjectID } = require('mongodb');

async function getPostsCollection() {
	const connection =
		await MongoClient.connect('mongodb://localhost:27017');

	const database = connection.db('nov-18');
	return database.collection('posts');
}

async function getPosts() {
	const collection = await getPostsCollection();
	return collection.find({}).toArray();
}

async function createPost(post) {
	const collection = await getPostsCollection();
	return collection.insertOne(post);
}

async function deletePost(id) {
	const collection = await getPostsCollection();
	return collection.deleteOne({ _id: ObjectID(id) });
}

async function getPostById(id) {
	const collection = await getPostsCollection();
	return collection.findOne({ _id: ObjectID(id) });
}

async function updatePostById(id, post) {
	const collection = await getPostsCollection();
	return collection
		.updateOne(
			{ _id: ObjectID(id) },
			{ $set: post }
		);
}

async function getPostsByUserId(userId) {
	const collection = await getPostsCollection();
	return collection.find({ userId: userId }).toArray();
}

module.exports = {
	getPosts,
	createPost,
	deletePost,
	getPostById,
	updatePostById,
	getPostsByUserId
};









