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

router.get("/:room_number", async (req, res, next) => {
	try {
		const token = otplib.totp.generate(atob(secret));
		const response = await axios.get(
			`roomer/openAPI/REST/bookings/roomassignments?roomNumber=${req.params.room_number}`,
			{
				headers: {
					Accept: "application/json",
					"Promoir-Roomer-Hotel-Secret": token
				}
			}
		);
		const findNames = response.data.booking.map(guest =>
			guest.baseRoomRequest.map(g => ({
				name: g.value.guest.map(z => z.value.firstName).join(),
				room: g.value.room
			}))
		);

		res.json(findNames[0]);
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

module.exports = router;
