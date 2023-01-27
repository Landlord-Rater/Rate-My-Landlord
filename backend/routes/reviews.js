const express = require("express");
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/auth");
const { ErrorResponse } = require("@remix-run/router");
const router = express.Router();

// get reviews by landlord name or city or zip
router.get("/", reviewController.getQueriedReviews);

// get user reviews
router.get("/:id", reviewController.getUserReviews, (req, res) => {
  res.status(200).json(res.locals.reviews);
});

// post user reviews
router.post("/", reviewController.postReviews, (req, res) =>
  res.status(200).json({
    reviews: res.locals.reviews,
  })
);

// update user review
router.put("/", reviewController.updateReview, (req, res) => {
  res.status(200).json({
    review: res.locals.review,
  });
});

// delete user review
router.delete("/:id", reviewController.deleteReview, (req, res) => {
  res.status(200).json({ deletedReview: res.locals.deletedReview });
});

module.exports = router;
