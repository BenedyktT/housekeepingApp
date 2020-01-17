var xmldoc = require("xmldoc");
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
	try {
		const response = await axios.get(
			"https://api.roomercloud.net/services/bookingapi/availability1?hotel=LAKI&channelCode=BDC&channelManagerCode=OWN&arrivalDate=2020-01-31&departureDate=2020-02-01"
		);
		const document = new xmldoc.XmlDocument(response.data);
		const economy = document.children[1].children[1];
		const standard = document.children[1].children[0];

		const availability = {
			eco: {
				desc: economy.attr.availabilityBaseCode,
				availableRooms: economy.children[1].children[0].attr.availability,
				rate: economy.children[1].children[0].attr.rate
			},
			std: {
				desc: standard.attr.availabilityBaseCode,
				availableRooms: standard.children[1].children[0].attr.availability,
				rate: standard.children[1].children[0].attr.rate
			}
		};

		res.json(availability);
	} catch (error) {
		console.error(error);
		res.json(error);
	}
});

module.exports = router;
