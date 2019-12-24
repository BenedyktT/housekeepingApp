const User = require("../../models/User");
const config = require("config");
const router = express.Router();

router.pos("/", async (req, res) => {
	const { user, email, password } = req.body;

	try {
		console.log("to be filled");
	} catch (error) {
		console.error(error);
		res.status(500).json("Internal Server Error");
	}
});
