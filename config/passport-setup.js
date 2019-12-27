const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const clientID = require("config").get("clientID");
const secretID = require("config").get("secretID");

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: clientID,
      clientSecret: secretID
    },
    () => {
      //passport cb fn
    }
  )
);

module.exports = passport;
