const express = require("express");
const app = express();
const connectDB = require("./config/config");
const path = require("path");

connectDB();
app.use(express.json({ extended: false }));
app.use("/user", require("./routes/api/auth/users"));

app.use("/cleanstatus", require("./routes/api/cleanstatus"));
app.use("/reservation", require("./routes/api/reservationstatus"));
app.use("/roomstatus", require("./routes/api/roomstatus"));
app.use("/roomsetup", require("./routes/api/roomsetup"));

//serve stati assets in prod
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server start on port ${PORT}`));
