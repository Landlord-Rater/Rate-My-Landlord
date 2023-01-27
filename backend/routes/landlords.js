const express = require("express");
const landlordController = require("../controllers/landlordController");
const reviewController = require("../controllers/reviewController");
const propertyController = require("../controllers/propertyController");

const auth = require("../middleware/auth");
const { ErrorResponse } = require("@remix-run/router");
const router = express.Router();

// get landlord and associated reviews
router.get(
  "/:id",
  landlordController.getLandLord,
  reviewController.getReviews,
  propertyController.getProperties,
  (req, res) => {
    res.status(200).json({
      landlord: res.locals.landLord,
      reviews: res.locals.reviews,
      properties: res.locals.properties,
    });
  }
);

// create new landlord
router.post("/", landlordController.createLandlord, (req, res) => {
  res.status(200).json({ landlord: res.locals.landLord });
});

// update landlord
// router.put("/:id", landlordController.updateProfile, (req, res) => {
//   res.status(200).json({ landlord: res.locals.landLord });
// });

module.exports = router;
