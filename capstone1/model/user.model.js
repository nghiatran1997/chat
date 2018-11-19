const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema({
	id: String,
	name: String,
	email: String
});

const User = mongoose.model('User', userSchema,'users');

module.exports = User;