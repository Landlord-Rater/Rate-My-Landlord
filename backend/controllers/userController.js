const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

const userController = {};

userController.createUsers = async (req, res, next) => {
  const { username, email, password, city } = req.body;

  db.query(`SELECT * FROM users where email = '${email}'`)
    .then((data) => {
      if (data.rows[0] !== undefined)
        return res.status(400).json({ error: "email has already been used" });
    })
    .catch((err) =>
      next({
        log: "error caught in createUsers middleware while checking the existence of the account in the database!",
        status: 400,
        message: { err: err },
      })
    );
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const text =
    "INSERT INTO users(username,email,password,city) VALUES ($1,$2,$3,$4)";

  const value = [username, email, hashedPassword, city];
  console.log(value);
  db.query(text, value)
    .then((_) => res.status(200).json("user created"))
    .catch((err) =>
      next({
        log: "error caught in createUsers middleware while trying to insert new user data into database!",
        status: 400,
        message: { err: err },
      })
    );
};

userController.getUsers = async (req, res, next) => {
  const { email, password } = req.body;
  const text = "SELECT * FROM users WHERE email = $1";
  const value = [email];

  const user = (await db.query(text, value)).rows[0];

  try {
    if (user && (await bcrypt.compare(password, user.password))) {
      //pass the web token to the next middleware to set it as a cookie for session control
      console.log(user.username);

      res.locals.email = email;
      res.locals.user = user.username;
      res.locals.userID = user._id;
      res.locals.city = user.city;
      console.log(res.locals.city);

      res.locals.id = generateToken({ id: user._id, username: user.username });
      next();
    } else {
      res.json("email or password incorrect");
    }
  } catch (err) {
    next({
      log: "error caught in getUsers middleware!",
      status: 400,
      message: { err: err },
    });
  }
};

userController.editProfile = async (req, res, next) => {
  try {
    const { username, city, email, userID } = req.body;
    // const queryString = 'SELECT vendors.name, ratings.rating, ratings.reviewername, ratings.date, ratings.reviewtext from Ratings INNER JOIN Vendors ON  Vendors.vendorID=Ratings.vendor_id'
    const queryString =
      "UPDATE USERS SET username = $1, city = $2, email = $3 WHERE _id = $4";
    const values = [username, city, email, userID];
    console.log(values);
    const query = await db.query(queryString, values);
    res.locals.profile = query.rows;
    console.log(query.rows);
    next();
  } catch (err) {
    next({
      log: "error on userController editProfile middleware function",
      message: {
        err: "userController.editProfile: ERROR: Check server logs for details",
      },
    });
  }
};

function generateToken(id) {
  return jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}
module.exports = userController;
