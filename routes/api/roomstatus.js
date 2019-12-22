const express = require("express");
const router = express.Router();
const axios = require("axios");
const otplib = require("otplib");
const atob = require("atob");
const secret = require("config").get("secret");
var xmldoc = require("xmldoc");
axios.defaults.baseURL = "https://api.roomercloud.net";
axios.defaults.headers.common["Promoir-Roomer-Hotel-ApplicationId"] = "HKLAKI";
axios.defaults.headers.common["Promoir-Roomer-Hotel-Identifier"] = "2b72a454";
otplib.totp.options = {
	digits: 8,
	algorithm: "sha256",
	encoding: "hex"
};

router.get("/", async (req, res, next) => {
	try {
		const token = otplib.totp.generate(atob(secret));
		const response = await axios.get(
			`roomer/openAPI/REST/bookings/roomassignments?roomNumber=${101}`,
			{
				headers: {
					Accept: "application/json",
					/* "Content-Type": "application/json", */
					"Promoir-Roomer-Hotel-Secret": token
				}
			}
		);
		res.json(response.data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: error });
	}
});

router.get("/roomkey", async (req, res, next) => {
	try {
		const token = otplib.totp.generate(atob(secret));
		const response = await axios.get(
			"roomer/openAPI/REST/bookings/bookingId=6120/roomId=30168/roomkey?withInactiveKeys=true",
			//rooom reservation 35962  #8126
			{
				headers: {
					"Promoir-Roomer-Hotel-Secret": token
				}
			}
		);

		res.json(response.data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: error });
	}
});

router.get("/test", async (req, res, next) => {
	try {
		const token = otplib.totp.generate(atob(secret));
		const response = await axios.get(
			`https://api.roomercloud.net/services/bookingapi/availability?hotel=2b72a454&channelCode=BDC&channelManagerCode=OWN&arrivalDate=2019-12-23&departureDate=2019-12-24`,
			{
				headers: {
					Accept: "*/*",
					/* "Content-Type": "application/json", */
					"Promoir-Roomer-Hotel-Secret": token
				}
			}
		);
		res.json(response.data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: error });
	}
});

module.exports = router;
