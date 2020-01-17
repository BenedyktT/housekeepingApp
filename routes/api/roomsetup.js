const express = require("express");
const router = express.Router();
const GoogleSpreadsheet = require("google-spreadsheet");

const creds = JSON.stringify(require("../../client_secret.js"));

router.get("/", async (req, res) => {
  const doc = new GoogleSpreadsheet(
    "1VNSbty91bi83frVi3GQlmgnxiCLDKmAxA8ys3AVZ-Oc"
  );

  // Authenticate with the Google Spreadsheets API.
  await doc.useServiceAccountAuth(creds, function(err) {
    // Get all of the rows from the spreadsheet.
    doc.getRows(1, function(err, rows) {
      if (err) {
        res.status(400).json(err);
      }
      const roomSetup = rows.map(e => ({
        number: e.room,
        roomNote: e.roomnotes
      }));
      res.json(roomSetup);
    });
  });
});

module.exports = router;
