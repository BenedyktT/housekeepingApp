const mongoose = require("mongoose");
<<<<<<< HEAD
const db = require("config").get("mongoURI");
=======
/* const db = require("config").get("mongoURI"); */
>>>>>>> test

const connectDB = async () => {
	try {
		await mongoose.connect(
<<<<<<< HEAD
			db,
=======
			process.env.API_mongoURI,
>>>>>>> test
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
