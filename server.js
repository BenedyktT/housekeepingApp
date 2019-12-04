const express = require("express");
const app = express();
const otplib = require("otplib");
const atob = require("atob");
const secret = require("config").get("secret");
otplib.totp.options = {
	digits: 8,
	algorithm: "sha256",
	encoding: "hex"
};
const token = otplib.totp.generate(atob(secret));

const axios = require("axios");

/* axios.defaults.baseURL = "https://api.roomercloud.net"; 

/hotelinfo/ROOM


/inventories/rooms
*/
axios.defaults.headers.common["Promoir-Roomer-Hotel-Secret"] = token;
axios.defaults.headers.common["Promoir-Roomer-Hotel-ApplicationId"] = "HKLAKI";
axios.defaults.headers.common["Promoir-Roomer-Hotel-Identifier"] = "2b72a454";

app.use(express.json({ extended: false }));

app.get("/", async (req, res, next) => {
	try {
		const response = await axios.get(
			"https://api.roomercloud.net/services//hotelinfo/ROOM "
		);
		res.json(response.data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: error });
	}
});

app.get("/", (req, res) => res.send("API running"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server start on port ${PORT}`));
