const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/capstone1');
//create schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
	id: String,
	name: String,
	email: String
});

const wordsSchema = new Schema({
	keywords: String,
	type: String,
	nummberOfCharactor: Number
});
//create model from schema
const users = mongoose.model('users', userSchema,'users');
const words = mongoose.model('words', wordsSchema,'words');



// users.create({
// 	name: "long",
// 	age : 20
// });

// words.create({
// 	keywords: 'dog',
// 	type: 'noun',
// 	nummberOfCharactor: 3
// });

// words.find().exec(function(err, result) {
// 	console.log(result);
// });

// users.update({name:"long"},{name:"sang"}).exec(function(err, result){
// 	console.log(result);
// });

module.exports = users;
module.exports = words;