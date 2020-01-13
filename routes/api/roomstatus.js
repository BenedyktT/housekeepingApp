const express = require("express");
const router = express.Router();
const axios = require("axios");
const otplib = require("otplib");
const atob = require("atob");
<<<<<<< HEAD
const secret = require("config").get("secret");
var xmldoc = require("xmldoc");
=======
const secret = process.env.API_secret;
const auth = require("./auth/middleware");
const Room = require("../../models/Room");
const moment = require("moment");
>>>>>>> test
axios.defaults.baseURL = "https://api.roomercloud.net";
axios.defaults.headers.common["Promoir-Roomer-Hotel-ApplicationId"] = "HKLAKI";
axios.defaults.headers.common["Promoir-Roomer-Hotel-Identifier"] = "2b72a454";
otplib.totp.options = {
<<<<<<< HEAD
  digits: 8,
  algorithm: "sha256",
  encoding: "hex"
};

router.get("/", async (req, res) => {
  const token = otplib.totp.generate(atob(secret));
  const response = await axios.post(
    `roomer/openAPI/REST/estimates/booking`,
    /* `roomer/openAPI/REST/bookings/roomassignments?roomNumber=${req.params.room_number}`, */
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/xml",
        "Promoir-Roomer-Hotel-Secret": token
      }
    }
  );

  res.json(response.data);
=======
	digits: 8,
	algorithm: "sha256",
	encoding: "hex"
};

router.get("/", async (req, res) => {
	const token = otplib.totp.generate(atob(secret));
	const response = await axios.post(
		`roomer/openAPI/REST/estimates/booking`,
		/* `roomer/openAPI/REST/bookings/roomassignments?roomNumber=${req.params.room_number}`, */
		{
			headers: {
				Accept: "application/json",
				"Content-Type": "application/xml",
				"Promoir-Roomer-Hotel-Secret": token
			}
		}
	);

	res.json(response.data);
});

//set room clean
///roomstatus/setclean:101

router.post("/cleanrooms/:number", auth, async (req, res) => {
	const { number } = req.params;
	const { user } = req;

	try {
		const today = moment().startOf("day");
		const isAlreadyCleaned = await Room.findOne({
			number,
			createdAt: {
				$gte: today.toDate(),
				$lte: moment(today)
					.endOf("day")
					.toDate()
			}
		});

		if (isAlreadyCleaned) {
			return res
				.status(402)
				.json({ errors: [{ msg: "Room has been cleaned already" }] });
		}
		const room = new Room({
			number,
			user
		});
		await room.save();
		const data = await Room.findById(room.id).populate({
			path: "user",
			model: "User",
			select: "name"
		});
		res.json({
			number: data.number,
			username: data.user.name,
			createdAt: data.createdAt
		});
	} catch (error) {
		console.error(error);
		res.status(500).json("internal server error");
	}
});

//get all clean rooms
router.get("/cleanrooms/:date", auth, async (req, res) => {
	try {
		const date = moment(req.params.date).startOf("day");
		const room = await Room.find({
			createdAt: {
				$gte: date.toDate(),
				$lte: moment(date)
					.endOf("day")
					.toDate()
			}
		}).populate({
			path: "user",
			model: "User",
			select: "name"
		});
		res.json(room);
	} catch (error) {
		console.error(error);
		res.status(500).json("internal server error");
	}
>>>>>>> test
});

module.exports = router;
