const express = require("express");
const router = express.Router();
const axios = require("axios");
var xmldoc = require("xmldoc");
const otplib = require("otplib");
const atob = require("atob");
const secret = require("config").get("secret");
const auth = require("./auth/middleware");

axios.defaults.baseURL = "https://api.roomercloud.net";
axios.defaults.headers.common["Promoir-Roomer-Hotel-ApplicationId"] = "HKLAKI";
axios.defaults.headers.common["Promoir-Roomer-Hotel-Identifier"] = "2b72a454";
otplib.totp.options = {
  digits: 8,
  algorithm: "sha256",
  encoding: "hex"
};
router.get("/", async (req, res, next) => {
  try {
    const token = otplib.totp.generate(atob(secret));
    const response = await axios.get("/services//hotelinfo/ROOM", {
      headers: {
        Accept: "application/x-microsoft-dataset",
        "Promoir-Roomer-Hotel-Secret": token
      }
    });
    const document = new xmldoc.XmlDocument(response.data);
    let data = document.children[3].children.map(room => room.attr);
    data.splice(0, 1);
    const roomStatus = data.map(room => {
      return (({ Room, Status }) => ({ Room, Status }))(room);
    });
    res.json(roomStatus);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error });
  }
});

module.exports = router;
