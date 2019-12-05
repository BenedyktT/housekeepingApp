const express = require("express");
const router = express.Router();
const axios = require("axios");
const token = require("../../config/config");
var xmldoc = require("xmldoc");

axios.defaults.baseURL = "https://api.roomercloud.net";
axios.defaults.headers.common["Promoir-Roomer-Hotel-Secret"] = token;
axios.defaults.headers.common["Promoir-Roomer-Hotel-ApplicationId"] = "HKLAKI";
axios.defaults.headers.common["Promoir-Roomer-Hotel-Identifier"] = "2b72a454";

router.get("/", async (req, res, next) => {
	try {
		const response = await axios.get("/services//hotelinfo/ROOM", {
			headers: { Accept: "application/x-microsoft-dataset" }
		});
		const document = new xmldoc.XmlDocument(response.data);
		let data = document.children[3].children.map(room => room.attr);
		data.splice(0, 1);
		res.json(data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: error });
	}
});

module.exports = router;
