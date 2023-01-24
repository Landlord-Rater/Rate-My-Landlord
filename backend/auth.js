const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const db = require("./models.js");


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
    async (request, accessToken, refreshToken, profile, done) => {
      const queryString = 'SELECT google_id, email, username FROM users WHERE google_id = $1'
      const values = [profile.id]
      const user = await db.query(queryString, values);

      let providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;
      
      //SCENARIO 1: GOOGLE ID EXISTS
      if (user.rows.length > 0) {
        console.log("Existing User: ", user);
        console.log("Existing user row 0: ", user.rows[0]);
        done(null, user.rows[0]);
      } 

      //SCENARIO 2: GOOGLE ID DOES NOT EXIST BUT EMAIL EXISTS
        // const newqueryString = 'UPDATE user SET google_id '
      else if (true) {
        //UPDATE mytable
        //SET google_id = 'new_value'
        //WHERE google_id IS NULL;
      }

      //SCENARIO 3: BOTH DOES NOT EXIST
      else {
        const newqueryString = 'INSERT INTO users (google_id, email, username) VALUES ($1,$2,$3) RETURNING google_id, email, username'
        const newValues = [profile.id, profile.email, profile.given_name]
        const newUser = await db.query(newqueryString, newValues);
        console.log("newUser: ", newUser);
        console.log('newUser row 0: ', newUser.rows[0])
        done(null, newUser.rows[0]);
      }
    console.log('profile: ', profile)
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser(function (user, done) {
  // console.log("deserializing user:", user);
  //another database call with user id
  done(null, user);
});
