const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
require("./auth");
const app = express();
const oauthRouter = require("./routes/oauth");
const userRouter = require("./routes/user");
const reviewsRouter = require("./routes/reviews");
const propertyRouter = require("./routes/properties");
const landlordRouter = require("./routes/landlords");
///need for parsing the body of the request data
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, "../frontend")));


app.use("/oauth", oauthRouter);
app.use("/user", userRouter);
app.use("/reviews", reviewsRouter);
app.use("/properties", propertyRouter);
app.use("/landlords", landlordRouter);


// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("Page not found, please check your URL endpoints!")
);
/**
 * express error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
