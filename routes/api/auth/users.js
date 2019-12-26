const express = require("express");
const User = require("../../../models/User");
const config = require("config");
const router = express.Router();
const bcrypt = require("bcryptjs");

//register new user

router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	let user = await User.findOne({ email });

	try {
		if (user) {
			res.status(400).json({ errors: [{ msg: "User already exist" }] });
		}

		user = new User({
			name,
			email,
			password
		});
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json("Internal Server Error");
	}
});

router.post("/login", async (req, res) => {
	const { name, password } = req.body;
	try {
		let user = await User.findOne({ name });
		if (!user) {
			return res.json("Didn't find the user");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.json("Invalid Credentials");
		}
		res.json(user);
	} catch (error) {
		console.error(error);
		res.json("internal server error");
	}
});

module.exports = router;
