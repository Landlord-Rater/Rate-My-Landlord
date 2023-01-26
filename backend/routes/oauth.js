const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("../auth");
const router = express.Router();

//localhost8080/oauth/google
router.get(
  "/google",
  (req, res, next) => {
    console.log("first authentication");
    next();
  },
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//localhost8080/oauth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/oauth/protected",
    failureRedirect: "/oauth/google/failure",
  })
);

//localhost8080/oauth/protected 
router.get("/protected", (req, res) => {
  res.json(req.user);
});

////localhost8080/oauth/google/failure
router.get("/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

//oauth logout
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Oauth User Logged Out!");
});


module.exports = router;