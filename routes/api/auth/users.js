const express = require("express");
const User = require("../../../models/User");
const secret = require("config").get("secretID");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware");

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
	console.log(name, password);
	try {
		let user = await User.findOne({ name });
		if (!user) {
			return res.json("Didn't find the user");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.json("Invalid Credentials");
		}
		const payload = { id: user.id, name: user.name };
		jwt.sign(payload, secret, { expiresIn: 3600 }, function(err, token) {
			if (err) throw err;
			return res.json(token);
		});
	} catch (error) {
		console.error(error);
		res.json("internal server error");
	}
});

router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user);
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.json("internal server error");
	}
});

module.exports = router;
