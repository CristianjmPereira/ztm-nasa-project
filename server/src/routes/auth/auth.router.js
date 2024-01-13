const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

const authRouter = express.Router();

const AUTH_OPTIONS = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google Profile", profile);
  return done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
// Save the session to the cookie
passport.serializeUser((user, done) => {
  console.log("Serializing user", user);
  done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((user, done) => {
  console.log("Deserializing user", user);
  done(null, user);
});

function checkLoggedIn(req, res, next) {
  console.log("Checking if user is logged in", req.user);
  const isLogged = req.isAuthenticated() && req.user;
  if (!isLogged) {
    return res.status(401).json({ status: "error", code: "unauthorized" });
  }

  return next();
}

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  })
);

authRouter.get("/logout", (req, res) => {
  req.logout(); // Clear the session cookie
  res.clearCookie("session"); // Clear the session cookie on the response
  return res.redirect("/");
});

authRouter.get("/secret", checkLoggedIn, (req, res) => {
  res.send("Hello");
});

authRouter.get("/failure", (req, res) => {
  res.json("Failure");
});

module.exports = { configuredPassport: passport, authRouter };
