const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	email: {
		required: true,
		type: String,
		unique: true,
		validate: value => validator.isEmail(value)
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	avatar: {
		type: String
	}
});

module.exports = mongoose.model("User", userSchema);
