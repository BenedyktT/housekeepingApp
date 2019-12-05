const otplib = require("otplib");
const atob = require("atob");
const secret = require("config").get("secret");
const axios = require("axios");

otplib.totp.options = {
	digits: 8,
	algorithm: "sha256",
	encoding: "hex"
};
const token = otplib.totp.generate(atob(secret));

module.exports = token;
