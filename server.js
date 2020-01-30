const express = require("express");
const app = express();
const connectDB = require("./config/config");
require("dotenv").config();
const wakeUpDyno = require("./wakeUpDyno");
const session = require("express-session");
const moment = require("moment");

connectDB();
app.use(express.json({ extended: false }));
app.use("/user", require("./routes/api/auth/users"));
app.use("/cleanstatus", require("./routes/api/cleanstatus"));
app.use("/reservation", require("./routes/api/reservationstatus"));
app.use("/roomstatus", require("./routes/api/roomstatus"));
app.use("/roomsetup", require("./routes/api/roomsetup"));
app.use("/availability", require("./routes/api/availability"));
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));
	app.get("/*", function(req, res) {
		res.sendFile(path.join(__dirname, "build", "index.html"));
	});
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	wakeUpDyno({
		url: "http://lakihk.herokuapp.com/", // url string
		interval: 60000 * 25, // interval in milliseconds (1 minute in this example)
		startNap: [19, 0, 0, 0], // the time to start nap in UTC, as [h, m, s, ms] (05:00 UTC in this example)
		endNap: [06, 59, 59, 999] // time to wake up again, in UTC (09:59:59.999 in this example)
	}).start();

	console.log(`server start on port ${PORT}`);
});
