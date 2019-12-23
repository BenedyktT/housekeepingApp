const express = require("express");
const router = express.Router();
const axios = require("axios");
const otplib = require("otplib");
const atob = require("atob");
const secret = require("config").get("secret");
var xmldoc = require("xmldoc");
axios.defaults.baseURL = "https://api.roomercloud.net";
axios.defaults.headers.common["Promoir-Roomer-Hotel-ApplicationId"] = "HKLAKI";
axios.defaults.headers.common["Promoir-Roomer-Hotel-Identifier"] = "2b72a454";
otplib.totp.options = {
  digits: 8,
  algorithm: "sha256",
  encoding: "hex"
};

router.get("/", async (req, res) => {
  const token = otplib.totp.generate(atob(secret));
  const response = await axios.post(
    `roomer/openAPI/REST/estimates/booking`,
    /* `roomer/openAPI/REST/bookings/roomassignments?roomNumber=${req.params.room_number}`, */
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/xml",
        "Promoir-Roomer-Hotel-Secret": token
      }
    }
  );

  res.json(response.data);
});

module.exports = router;
