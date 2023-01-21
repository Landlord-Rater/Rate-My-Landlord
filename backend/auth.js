const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID =
  "970998628662-kgh03coacjqg4fc9k6e1ov3204jjp5sa.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
    console.log('profile: ', profile)
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializing user:", user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("deserializing user:", user);
  done(null, user);
});
