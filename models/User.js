const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
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
=======
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
  }
>>>>>>> test
});

module.exports = mongoose.model("User", userSchema);
