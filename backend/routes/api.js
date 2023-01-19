const express = require('express');
const dbController = require('../controllers/dbController');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/getall', dbController.getAll);

router.get(
  '/getlandlord/:id',
  dbController.getLandLord,
  dbController.getReviews,
  (req, res) => {
    res.status(200).json({
      landlord: res.locals.landLord,
      reviews: res.locals.reviews,
    });
  }
);

router.post('/createlandlord', dbController.createLandlord);

router.post(
  '/login',
  userController.getUsers,
  cookieController.setSSIDCookie,
  (req, res) => res.status(200).json('user authenicated!')
);

router.post('/logout', (req, res) => {
  res.clearCookie('ssid');
  res.status(200).json('logged out!');
});
router.post('/signup', userController.createUsers);

router.post('/postReviews', dbController.postReviews);
router.post('/postReviews', auth.verifyToken, dbController.postReviews);

module.exports = router;
