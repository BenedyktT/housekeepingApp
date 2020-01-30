const express = require("express");
const app = express();
const connectDB = require("./config/config");
require("dotenv").config();
const wakeUpDyno = require("./wakeUpDyno");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

connectDB();
app.use(cookieParser());
app.use(
	session({
		secret: "fwfeqr145a",
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({
			mongooseConnection: mongoose.connection
		})
	})
);
app.use(express.json({ extended: false }));
app.use("/user", require("./routes/api/auth/users"));
app.use("/cleanstatus", require("./routes/api/cleanstatus"));
app.use("/reservation", require("./routes/api/reservationstatus"));
app.use("/roomstatus", require("./routes/api/roomstatus"));
app.use("/roomsetup", require("./routes/api/roomsetup"));
app.use("/availability", require("./routes/api/availability"));
/* app.use(function(req, res, next) {
	if (req.session && req.session.user) {
		User.findOne({ email: req.session.user.email }, function(err, user) {
			if (user) {
				req.user = user;
				delete req.user.password; // delete the password from the session
				req.session.user = user; //refresh the session value
				res.locals.user = user;
			}
			// finishing processing the middleware and run the route
			next();
		});
	} else {
		next();
	}
});

app.get("/foo", function(req, res, next) {
	console.log(req.session);
	res.json("you viewed this page " + req.session.user);
}); */
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
