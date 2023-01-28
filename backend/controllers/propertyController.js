const db = require("../models");

const propertyController = {};

propertyController.createProperty = (req, res, next) => {
  //req.params for specific landlord
  const { streetAddress, city, state, zip, landlord_id, lat, lng } = req.body;
  // "INSERT INTO properties (street_number, street_name, city, state, zipcode) VALUES ($1,$2,$3,$4,$5) WHERE landlord_id = $6 RETURNING street_number, street_name, city, state, zipcode";
  const text =
    "INSERT INTO properties (street_address, city, state, zip, landlord_id, lat, lng) VALUES ($1,$2,$3,$4,$5,$6, $7) RETURNING street_address, city, state, zip, lat, lng";
  //talk to jeff about this stuff
  // const value = [streetNumber, streetName, city, state, zipcode, req.params.id];
  const value = [streetAddress, city, state, zip, landlord_id, lat, lng];
  console.log(value);
  db.query(text, value)
    .then((data) => res.json(data.rows[0]))
    .catch((err) =>
      next({
        log: "error caught in createProperty middleware!",
        status: 400,
        message: { err: err },
      })
    );
};

propertyController.getProperties = (req, res, next) => {
  const text =
    "SELECT properties.lat, properties.lng, properties.street_address, properties.city, properties.zip, properties.state FROM properties WHERE landlord_id = $1";
  // "SELECT landlords.name, reviews.rating, reviews.would_rent_again, reviews.landlord_id AS _id FROM landlords LEFT JOIN reviews ON landlords._id =  reviews.landlord_id WHERE landlords._id = $1";

  const value = [req.params.id];
  db.query(text, value)
    .then((data) => {
      // if (!data.rows[0]) return res.json("properties not in database");
      res.locals.properties = data.rows;
      // console.log(res.locals.properties);
      next();
    })
    .catch((err) =>
      next({
        log: "error caught in getProperties middleware!",
        status: 400,
        message: { err: err },
      })
    );
};

propertyController.deleteProperty = async (req, res, next) => {
  try {
    const queryString = "DELETE FROM properties WHERE _id = $1";
    const values = [req.params.id];
    const deletedProperty = await db.query(queryString, values);
    res.locals.deleted = deletedProperty;
    next();
  } catch (err) {
    next({
      log: "error on deleteProperty middleware function",
      message: {
        err: "propertyController.deleteProperty: ERROR: Check server logs for details",
      },
    });
  }
};

propertyController.updateProperty = async (req, res, next) => {
  try {
    const { streetAddress, city, state, zipcode } = req.body;
    const queryString =
      "UPDATE properties SET street_address = $1, city = $2, state = $3, zipcode = $4 WHERE reviewername = $5";
    const values = [streetAddress, city, state, zipcode, req.params.id];
    const query = await db.query(queryString, values);
    res.locals.property = query.rows;
    next();
  } catch (err) {
    next({
      log: "error on propertyController.updateProperty middleware function",
      message: {
        err: "propertyController.updateProperty: ERROR: Check server logs for details",
      },
    });
  }
};

module.exports = propertyController;
