const mongoose = require("mongoose");
/* const db = require("config").get("mongoURI"); */

const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.API_mongoURI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			},
			console.log("connected to db")
		);
	} catch (e) {
		console.error(e.message);
		process.exit(1);
	}
};

module.exports = connectDB;
