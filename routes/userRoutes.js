const express = require('express');
const router = express.Router();
const dbConnection = require('../db/connect');

function initUserRoutes() {
	router.get('/getUsers',  async (req, res) => {
		const fetchedUsers = await dbConnection.fetchRegsiteredUsers();
		res.send({ users: fetchedUsers });
	});

	router.post('/createUser', async (req, res) => {
		const requestBody = req.body;
		let userCreateResult;
		let response = {
			error: true
		};

		if (requestBody) {
			userCreateResult = await dbConnection.createUser(requestBody);
			console.log('user create result: ' + userCreateResult);
			response.error = userCreateResult ? true : false;
			res.send(response);
		}
	});
}

initUserRoutes();

module.exports = {
	router: router
}
