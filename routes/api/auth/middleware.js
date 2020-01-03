let jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token) {
    jwt.verify(token, config.get("secretID"), (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.user = decoded.id;

        next();
      }
    });
  } else {
    res.status(403).json("Token is not provided");
  }
};
