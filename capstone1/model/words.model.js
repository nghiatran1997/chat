const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wordsSchema = new Schema({
	id: Number,
	keywords: String,
	type: String,
	nummberOfCharactor: Number
});


const Word = mongoose.model('Word', wordsSchema,'words');

module.exports = Word;