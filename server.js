const express = require("express");
const app = express();
const connectDB = require("./config/config");
connectDB();
app.use(express.json({ extended: false }));

app.use("/cleanstatus", require("./routes/api/cleanstatus"));
app.use("/reservation", require("./routes/api/reservationstatus"));
app.use("/roomstatus", require("./routes/api/roomstatus"));
app.get("/", (req, res) => res.send("API running"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server start on port ${PORT}`));
