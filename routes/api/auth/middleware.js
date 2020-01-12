let jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
	let token = req.headers["x-access-token"] || req.headers["authorization"];

	if (token) {
		jwt.verify(token, process.env.API_secretID, (err, decoded) => {
			if (err) {
				res.status(403).json({ errors: [{ msg: "Token is not valid" }] });
			} else {
				req.user = decoded.id;
				next();
			}
		});
	} else {
		res.status(403).json({ errors: [{ msg: "Token does not exist" }] });
	}
};
