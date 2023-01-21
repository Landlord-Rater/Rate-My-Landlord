const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

const reviewController = {};

reviewController.getAll = (req, res, next) => {
  const text = 'SELECT * FROM landlords';

  db.query(text)
    .then(async (data) => {
      const queryText =
        'SELECT AVG(rating) FROM reviews where landlord_id = $1;';
      const landLords = data.rows;
      //this loop is to query each landlord's review and find the average of all their ratings
      for (const person of landLords) {
        const value = [person._id];
        const average = (await db.query(queryText, value)).rows[0].avg;
        //delcare a new property name averageRating in each landlord object and assign the average found
        average === null
          ? (person.averageRating = null)
          : (person.averageRating = Number.parseFloat(average).toFixed(1));
      }
      res.status(200).json(landLords);
    })
    .catch((err) =>
      next({
        log: 'error caught in getAll middleware!',
        status: 400,
        message: { err: err },
      })
    );
};

reviewController.postReviews = async (req, res, next) => {
  try {
    // const { userId } = res.locals.user;

    const { userID, landlord_id, text, rating, would_rent_again, date } =
      req.body;
    const queryText =
      'INSERT INTO reviews (landlord_id, text, rating, would_rent_again, date, user_id) values($1,$2,$3,$4,$5,$6)';
    const value = [landlord_id, text, rating, would_rent_again, date, userID];
    console.log(value);
    const review = await db.query(queryText, value);

    res.locals.rating = review;
    // console.log(review);
    return next();
    // .then((_) => res.status(200).json('review posted'))
  } catch (err) {
    next({
      log: 'error caught in postReviews middleware!',
      status: 400,
      message: { err: err + 'ahh' },
    });
  }
};

//make another getReview function specific to user

reviewController.getReviews = (req, res, next) => {
  const text =
    'SELECT reviews.*, users.username AS user FROM reviews INNER JOIN users ON reviews.user_id = users._id AND reviews.landlord_id = $1';
  const value = [res.locals.landLord._id];
  db.query(text, value)
    .then((data) => {
      res.locals.reviews = data.rows;
      next();
    })
    .catch((err) =>
      next({
        log: 'error caught in getReviews middleware!',
        status: 400,
        message: { err: err },
      })
    );
};

module.exports = reviewController;
