const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

const userController = {};

userController.createUsers = async (req, res, next) => {
  const { username, email, password } = req.body;

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

  const text = "INSERT INTO users(username,email,password) VALUES ($1,$2,$3)";

  const value = [username, email, hashedPassword];

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

function generateToken(id) {
  return jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}
module.exports = userController;
