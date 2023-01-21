const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
require("./auth");
const app = express();
const apiRouter = require("./routes/api");
//need for parsing the body of the request data
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, "../frontend")));


app.get(
  "/api/auth/google", (req,res,next)=>{
    console.log('first authentication');
    next();
  },
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/api/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:8080/",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/protected", (req, res) => {
  res.json(req.user);
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});
//

app.use("/api", apiRouter);

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
