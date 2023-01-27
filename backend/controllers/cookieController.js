const cookieController = {};
const jwt = require("jsonwebtoken");
/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie("ssid", res.locals.id, { maxAge: 10 * 86400000, httpOnly: true });
  next();
};

cookieController.createJWToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


module.exports = cookieController;
