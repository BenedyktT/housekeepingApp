const express = require("express");
const router = express.Router();
const axios = require("axios");
const token = require("../../config/config");

axios.defaults.baseURL = "https://api.roomercloud.net";
axios.defaults.headers.common["Promoir-Roomer-Hotel-Secret"] = token;
axios.defaults.headers.common["Promoir-Roomer-Hotel-ApplicationId"] = "HKLAKI";
axios.defaults.headers.common["Promoir-Roomer-Hotel-Identifier"] = "2b72a454";

router.get("/", async (req, res, next) => {
	try {
		const response = await axios.get(
			"roomer/openAPI/REST/inventories/rooms?statusDate=2019-12-05 "
		);

		res.json(response.data.roomStatusList.roomStatus);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: error });
	}
});

module.exports = router;
