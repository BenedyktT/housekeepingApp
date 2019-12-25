const express = require("express");
const User = require("../../../models/User");
const config = require("config");
const router = express.Router();

router.post("/", async (req, res) => {
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
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
