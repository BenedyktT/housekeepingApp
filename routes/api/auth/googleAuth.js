const router = require("express").Router();
const passport = require("passport");
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["spreadsheets"]
  })
);

router.get("/google/redirect", (req, res) => {
  res.send("user authenticated route callback");
});

module.exports = router;
