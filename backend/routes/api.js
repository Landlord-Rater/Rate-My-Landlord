const express = require('express');
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const landlordController = require('../controllers/landlordController');
const auth = require('../middleware/auth');
const { ErrorResponse } = require('@remix-run/router');
const router = express.Router();

router.get('/getall', reviewController.getAll);

router.get(
  '/getlandlord/:id',
  landlordController.getLandLord,
  reviewController.getReviews,
  (req, res) => {
    res.status(200).json({
      landlord: res.locals.landLord,
      reviews: res.locals.reviews,
    });
  }
);

//create route here
router.get('/getuser/success', reviewController.getReviews, (req, res) => {
  res.status(200).json({
    reviews: res.locals.reviews,
  });
});

router.get(
  '/getuser',
  userController.getUsers,
  reviewController.getReviews,
  (req, res) => {
    res.status(200).json({
      user: res.locals.user,
      reviews: res.locals.reviews,
    });
  }
);

router.post('/createlandlord', landlordController.createLandlord);

router.post(
  '/login',
  userController.getUsers,
  cookieController.setSSIDCookie,
  (req, res) =>
    res.status(200).json({
      message: 'user authenicated!',
      user: res.locals.user,
      email: res.locals.email,
      userID: res.locals.userID,
    })
);

router.post('/logout', (req, res) => {
  res.clearCookie('ssid');
  res.status(200).json('logged out!');
});
router.post('/signup', userController.createUsers);

router.post('/postReviews', reviewController.postReviews, (req, res) =>
  res.status(200).json({
    reviews: res.locals.reviews,
  })
);

// router.post('/postReviews', auth.verifyToken, reviewController.postReviews);

module.exports = router;
