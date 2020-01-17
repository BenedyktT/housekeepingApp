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

    res.json(rooms);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error });
  }
});

module.exports = router;
