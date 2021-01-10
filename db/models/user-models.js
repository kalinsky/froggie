const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
	id: String,
	name: String,
	tag: String
});
const discordUsersModel = mongoose.model('discord_users', userSchema);
const webUsersModel = mongoose.model('web_users', userSchema);

module.exports = {
	discordUsersModel: discordUsersModel,
	webUsersModel: webUsersModel
};