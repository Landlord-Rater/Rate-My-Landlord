const db = require('../models');
require('dotenv').config();

const landlordController = {};

landlordController.createLandlord = (req, res, next) => {
  const { location, name } = req.body;
  const text =
    'INSERT INTO landlords(name, location) VALUES ($1,$2) RETURNING _id, name, location';

  const value = [name, location];
  db.query(text, value)
    .then((data) => res.json(data.rows[0]))
    .catch((err) =>
      next({
        log: 'error caught in createLandLord middleware!',
        status: 400,
        message: { err: err },
      })
    );
};

landlordController.getLandLord = (req, res, next) => {
  const text =
    // "select landlords.name, landlords.location, reviews.rating, reviews.would_rent_again, reviews.landlord_id as _id from reviews right join landlords ON landlords._id = $1 AND reviews.landlord_id = $1";
    'SELECT landlords.name, landlords.location, reviews.rating, reviews.would_rent_again, reviews.landlord_id AS _id FROM landlords LEFT JOIN reviews ON landlords._id =  reviews.landlord_id WHERE landlords._id = $1';
  const landlord = req.params.id;
  console.log(landlord);
  const value = [landlord];
  db.query(text, value)
    .then((data) => {
      //redirect to landlord submission page if landlord is not found
      console.log(data.rows);
      if (!data.rows[0]) return res.json('landlord not in database');
      // ratings is the average of all the ratings from all reviews
      // rentAgain is the average of 1s and 0s from the would_rent_again column in all reviews
      const ratings = average(data.rows.map((el) => el['rating']));
      const rentAgain = average(data.rows.map((el) => el['would_rent_again']));
      data.rows[0]['rating'] = Number.parseFloat(ratings).toFixed(1);
      data.rows[0]['would_rent_again'] = `${rentAgain * 100}%`;
      //pass the landlord card with name of landlord and the average ratings
      res.locals.landLord = data.rows[0];
      next();
    })
    .catch((err) =>
      next({
        log: 'error caught in getLandLord middleware!',
        status: 400,
        message: { err: err },
      })
    );
};

function average(arr) {
  const sum = arr.reduce((acc, cur) => acc + cur, 0);
  return sum / arr.length;
}

module.exports = landlordController;
