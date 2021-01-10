const mongoose = require('mongoose');
const userModels = require('./models/user-models');

function connectDB() {
	mongoose.connect('mongodb://localhost/botDB', {useNewUrlParser: true, useUnifiedTopology: true});
	const db = mongoose.connection;
	let error = false;

	db.on('error', function() {
		console.error.bind(console, 'connection error:');
		error = true;
	});

	db.once('open', function() {
		console.log('connected...');
		error = false;
	});

	return error;
}

async function fetchRegsiteredUsers() {
	const connectionError = connectDB();
	const db = mongoose.connection;
	let registeredUsers = [];

	if (connectionError) {
		return;
	}

	let users = await userModels.discordUsersModel.find({}).exec();

	if (users) {
		users.forEach((user) => {
			if (user.id) {
				registeredUsers.push(user.id);
			}
		});
	}

	mongoose.disconnect();
	db.close();

	return registeredUsers;
}

async function createUser(user) {
	const connectionError = connectDB();
	const db = mongoose.connection;
	let creationSuccess = false;

	if (connectionError) {
		return;
	}

	const createdUser = new userModels.discordUsersModel({
		id: user.id,
		name: user.name,
		tag: user.tag
	});

	try {
		await createdUser.save();
		creationSuccess = true;
	} catch (error) {
		console.log('err happened when creating db user ' + error);
	}

	console.log('created user: ' + creationSuccess);
	mongoose.disconnect();
	db.close();

	return creationSuccess;
}

module.exports = {
	createUser: createUser,
	fetchRegsiteredUsers: fetchRegsiteredUsers
}