const express = require("express");
const app = express();
const request = require("request");
const otplib = require("otplib");

//<ns6:key> 2b72a454 </ns6:key>
//<ns6:secret> NzhhMmI1OTYzNjNmYTkwNjE3YzUwNDBiN2EzYzMzZmUxYTlkZTNjNjc1MWVhMzY4YWRiOGNmYzFjMDIwM2ZlMQ== </ns6:secret>
/* 
hotelId = LAKI;
appId = HKLAKI; */
//hex 78a2b596363fa90617c5040b7a3c33fe1a9de3c6751ea368adb8cfc1c0203fe1
app.use(express.json({ extended: false }));

app.get("/", async (req, res, next) => {
	otplib.totp.options = {
		digits: 8,
		algorithm: "sha256",
		encoding: "base64"
	};
	const secret =
		"NzhhMmI1OTYzNjNmYTkwNjE3YzUwNDBiN2EzYzMzZmUxYTlkZTNjNjc1MWVhMzY4YWRiOGNmYzFjMDIwM2ZlMQ==";

	try {
		const token = otplib.totp.generate(secret);
		const options = {
			url:
				"http://dev1.roomerdev.net:8080/roomer/openAPI/REST/inventories/rooms",
			method: "GET",
			headers: {
				"Promoir-Roomer-Hotel-Identifier": "2b72a454",
				"Promoir-Roomer-Hotel-ApplicationId": "HKLAKI",
				"Promoir-Roomer-Hotel-Secret": token
			}
		};
		request(options, (error, response, body) => {
			if (error) console.error(error);
			console.log(body);
			return res.json(response);
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "server error" });
	}
});

app.get("/", (req, res) => res.send("API running"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server start on port ${PORT}`));
