const otplib = require("otplib");
const atob = require("atob");
const secret = require("config").get("secret");

otplib.totp.options = {
	digits: 8,
	algorithm: "sha256",
	encoding: "hex"
};

module.exports = token;
