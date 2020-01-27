var xmldoc = require("xmldoc");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const otplib = require("otplib");
const atob = require("atob");
const secret = process.env.API_secret;

router.get("/:arrival/:departure", async (req, res) => {
	const arrival = req.params.arrival;
	const departure = req.params.departure;
	const hotel = req.params.hotel || "LAKI";
	try {
		const response = await axios.get(
			`https://api.roomercloud.net/services/bookingapi/availability1?hotel=LAKI&channelCode=TRAVEL&channelManagerCode=OWN&arrivalDate=${arrival}&departureDate=${departure}`
		);
		const document = new xmldoc.XmlDocument(response.data);

		let availability = document.children[1].children
			.map(child => {
				return {
					room: child.attr.availabilityBaseCode,
					occupancy:
						(child.attr.availabilityBaseCode === "DBL-S" &&
							39 - child.children[1].children[0].attr.availability) ||
						(child.attr.availabilityBaseCode === "ECO-S" &&
							24 - child.children[1].children[0].attr.availability) ||
						(child.attr.availabilityBaseCode === "SUP-S" &&
							1 - child.children[1].children[0].attr.availability) ||
						(child.attr.availabilityBaseCode === "BUN-S" &&
							15 - child.children[1].children[0].attr.availability)
				};
			})
			.reduce((acc, curr) => {
				const find = acc.find(e => e.room === curr.room);

				if (!find) {
					return acc.concat([curr]);
				} else {
					return acc;
				}
			}, []);

		res.json(availability);
	} catch (error) {
		console.error(error);
		res.json(error);
	}
});

router.get("/reservation", async (req, res) => {
	const token = otplib.totp.generate(atob(secret));
	try {
		const response = await axios.get(
			`https://api.roomercloud.net/services/bookingapi/reservations?stayFromDate=2020-01-27T00:28:32&stayToDate=2020-01-280:28:32&includeOutOfOrder=true&includeInvoices=false&modifiedSince=2020-01-27T11:28:32`,
			{
				headers: {
					Accept: "application/json",
					"Promoir-Roomer-Hotel-Secret": token
				}
			}
		);

		res.json(response.data);
	} catch (error) {
		console.error(error);
		res.json(error);
	}
});

module.exports = router;
