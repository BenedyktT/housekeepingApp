const express = require("express");
const router = express.Router();
const axios = require("axios");
const otplib = require("otplib");
const atob = require("atob");
const secret = process.env.API_secret;

axios.defaults.baseURL = "https://api.roomercloud.net";
axios.defaults.headers.common["Promoir-Roomer-Hotel-ApplicationId"] = "HKLAKI";
axios.defaults.headers.common["Promoir-Roomer-Hotel-Identifier"] = "2b72a454";
otplib.totp.options = {
	digits: 8,
	algorithm: "sha256",
	encoding: "hex"
};
router.get("/:date", async (req, res, next) => {
	try {
		const token = otplib.totp.generate(atob(secret));

		const response = await axios.get(
			`roomer/openAPI/REST/inventories/rooms?statusDate=${req.params.date}`,
			{
				headers: {
					"Promoir-Roomer-Hotel-Secret": token
				}
			}
		);
		let rooms = response.data.roomStatusList.roomStatus;
		rooms = rooms.map(room =>
			(({ roomName, roomState }) => ({ Room: roomName, roomState }))(room)
		);
		const url = rooms
			.filter(e => {
				return e.roomState === "N_A";
			})
			.map(x => ({
				url: `roomer/openAPI/REST/bookings/roomassignments?roomNumber=${x.Room}`,
				Room: x.Room
			}));

		const roomsVacant = url.map(async promise => {
			try {
				await axios({
					method: "GET",
					url: promise.url,
					headers: {
						"Promoir-Roomer-Hotel-Secret": token
					}
				});
				return {
					Room: promise.Room,
					roomState: "OCCUPIED"
				};
			} catch (error) {
				return { Room: promise.Room, roomState: "VACANT" };
			}
		});
		const results = await Promise.all(roomsVacant);
		const combined = [...rooms, ...results];
		rooms = combined.reduce((acc, curr) => {
			const x = acc.find(item => item.Room === curr.Room);
			if (!x) {
				return curr.roomState === "N_A" ? acc : acc.concat([curr]);
			} else {
				return acc;
			}
		}, []);
		res.json(rooms);
	} catch (error) {
		if (error.response.status === 503) {
			const token = otplib.totp.generate(atob(secret));
			const response = await axios.get(
				`roomer/openAPI/REST/inventories/rooms?statusDate=${req.params.date}`,
				{
					headers: {
						"Promoir-Roomer-Hotel-Secret": token
					}
				}
			);
			let rooms = response.data.roomStatusList.roomStatus;
			rooms = rooms.map(room =>
				(({ roomName, roomState }) => ({ Room: roomName, roomState }))(room)
			);
			const url = rooms
				.filter(e => {
					return e.roomState === "N_A";
				})
				.map(x => ({
					url: `roomer/openAPI/REST/bookings/roomassignments?roomNumber=${x.Room}`,
					Room: x.Room
				}));

			const roomsVacant = url.map(async promise => {
				try {
					await axios({
						method: "GET",
						url: promise.url,
						headers: {
							"Promoir-Roomer-Hotel-Secret": token
						}
					});
					return {
						Room: promise.Room,
						roomState: "OCCUPIED"
					};
				} catch (error) {
					return { Room: promise.Room, roomState: "VACANT" };
				}
			});
			const results = await Promise.all(roomsVacant);
			const combined = [...rooms, ...results];
			rooms = combined.reduce((acc, curr) => {
				const x = acc.find(item => item.Room === curr.Room);
				if (!x) {
					return curr.roomState === "N_A" ? acc : acc.concat([curr]);
				} else {
					return acc;
				}
			}, []);
			res.json(rooms);
		}
		console.error(error.message);
		res.status(500).json({ msg: error });
	}
});

module.exports = router;
