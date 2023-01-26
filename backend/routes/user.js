const express = require("express");
const reviewController = require("../controllers/reviewController");
const userController = require("../controllers/userController");
const cookieController = require("../controllers/cookieController");
const landlordController = require("../controllers/landlordController");
const propertyController = require("../controllers/propertyController");
const auth = require("../middleware/auth");
const { ErrorResponse } = require("@remix-run/router");
const router = express.Router();

// login user
router.post(
  "/login",
  userController.getUsers,
  cookieController.setSSIDCookie,
  (req, res) =>
    res.status(200).json({
      message: "user authenicated!",
      user: res.locals.user,
      email: res.locals.email,
      userID: res.locals.userID,
      city: res.locals.city,
    })
);

// logout user
router.post("/logout", (req, res) => {
  res.clearCookie("ssid");
  res.status(200).json("logged out!");
});

// sign up user
router.post("/signup", userController.createUsers);

// edit user profile
router.put("/editprofile", userController.editProfile, (req, res) =>
  res.status(200).json(res.locals.rating)
);

// router.post('/postReviews', auth.verifyToken, reviewController.postReviews);

module.exports = router;
