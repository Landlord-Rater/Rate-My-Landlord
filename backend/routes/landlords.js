const express = require("express");
const landlordController = require("../controllers/landlordController");
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/auth");
const { ErrorResponse } = require("@remix-run/router");
const router = express.Router();

// get landlord and associated reviews
router.get(
  "/:id",
  auth.verifyToken,
  landlordController.getLandLord,
  reviewController.getReviews,
  (req, res, next) => {
    console.log("req.cookies: ", req.cookies);
    console.log('req.user: ', req.user)
    next();
  },
  (req, res) => {
    res.status(200).json({
      landlord: res.locals.landLord,
      reviews: res.locals.reviews,
    });
  }
);

// create new landlord
router.post(
  "/",
  landlordController.createLandlord,
  (req, res) => {
    res.status(200).json({ landlord: res.locals.landLord });
  }
);

// update landlord
// router.put("/:id", landlordController.updateProfile, (req, res) => {
//   res.status(200).json({ landlord: res.locals.landLord });
// });

module.exports = router;
