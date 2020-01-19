var xmldoc = require("xmldoc");
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
	const arrival = req.params.arrival;
	const departure = req.params.departure;
	const hotel = req.params.hotel || "LAKI";
	try {
		const response = await axios.get(
			`https://api.roomercloud.net/services/bookingapi/availability1?hotel=KLAUS&channelCode=BDC&channelManagerCode=OWN&arrivalDate=2020-01-19&departureDate=2020-01-20`
		);
		const document = new xmldoc.XmlDocument(response.data);

		const availability = document.children[1].children.map(child => {
			return {
				room: child.attr.availabilityBaseCode,
				desc: child.attr.description,
				rate: child.children[1].children[0].attr.rate,
				availability: child.children[1].children[0].attr.availability
			};
		});

		res.json(availability);
	} catch (error) {
		console.error(error);
		res.json(error);
	}
});

module.exports = router;
