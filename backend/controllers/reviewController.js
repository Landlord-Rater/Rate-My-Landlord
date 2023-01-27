const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

const reviewController = {};

reviewController.getQueriedReviews = (req, res, next) => {
  const values = [`%${req.query.search}%`];
  console.log("search query", values[0]);
  // const text = "SELECT * FROM landlords";
  const text =
    "SELECT * FROM landlords WHERE LOWER(name) LIKE $1 OR LOWER(location) LIKE $1;";
  db.query(text, values)
    .then(async (data) => {
      console.log("this is landlord", data.rows);
      const queryText =
        "SELECT AVG(rating) FROM reviews where landlord_id = $1;";
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
        log: "error caught in getAll middleware!",
        status: 400,
        message: { err: err },
      })
    );
};

reviewController.postReviews = async (req, res, next) => {
  try {
    const { landlord_id, text, rating, would_rent_again, date } = req.body;
    const queryText =
      "INSERT INTO reviews (landlord_id, text, rating, would_rent_again, date, user_id) values($1,$2,$3,$4,$5,$6) RETURNING landlord_id, text, rating, would_rent_again, date, user_id";
    const value = [
      landlord_id,
      text,
      rating,
      would_rent_again,
      date,
      req.user._id,
    ];
    const review = (await db.query(queryText, value)).rows[0];

    res.locals.reviews = review;
    return next();
  } catch (err) {
    next({
      log: "error caught in postReviews middleware!",
      status: 400,
      message: { err: err + "ahh" },
    });
  }
};

//  'SELECT AVG(rating) FROM reviews where landlord_id = $1;';

//make another getReview function specific to user
reviewController.getUserReviews = (req, res, next) => {
  const user = req.params.id;
  console.log(user);
  const text =
    //'SELECT reviews.* FROM reviews INNER JOIN users ON reviews.user_id = users._id AND reviews.user_id = $1'; working PERFECTLY FINE
    "SELECT reviews.*, landlords.* FROM reviews INNER JOIN users ON reviews.user_id = users._id AND reviews.user_id = $1 INNER JOIN landlords ON reviews.landlord_id = landlords._id";

  // const value = [res.locals.user._id];
  const value = [user];

  db.query(text, value)
    .then((data) => {
      console.log(data.rows);
      res.locals.reviews = data.rows;
      next();
    })
    .catch((err) =>
      next({
        log: "error caught in getReviews middleware!",
        status: 400,
        message: { err: err },
      })
    );
};

reviewController.getReviews = (req, res, next) => {
  const text =
    "SELECT reviews.*, users.username AS user FROM reviews INNER JOIN users ON reviews.user_id = users._id AND reviews.landlord_id = $1";
  const value = [res.locals.landLord._id];
  db.query(text, value)
    .then((data) => {
      res.locals.reviews = data.rows;
      next();
    })
    .catch((err) =>
      next({
        log: "error caught in getReviews middleware!",
        status: 400,
        message: { err: err },
      })
    );
};

module.exports = reviewController;
