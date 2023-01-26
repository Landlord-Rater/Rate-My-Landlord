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
      callbackURL: "http://localhost:3000/oauth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const queryString = 'SELECT google_id, email, username FROM users WHERE google_id = $1';
      const values = [profile.id];
      console.log('values: ', values);
      const user = await db.query(queryString, values);
      console.log('user: ', user)
      let providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;
      
      //SCENARIO 1: GOOGLE ID EXISTS
      if (user.rows.length > 0) {
        console.log("SCENARIO 1: Existing user row 0: ", user.rows[0]);
        done(null, user.rows[0]);
        return;
      } 

      const emailqueryString =
        "SELECT google_id, email, username FROM users WHERE email = $1";
      const emailvalues = [profile.email]
      const emailuser = await db.query(emailqueryString, emailvalues);
      console.log('PRE SCENARIO 2')
      console.log("emailuser rows: ", emailuser.rows);
      // console.log("profile.email: ", profile.email);
      // console.log('emailuser.email: ', emailuser.rows[0].email)
      // console.log('emailuser google id: ', emailuser.rows[0].google_id)
      
      //SCENARIO 2: GOOGLE ID DOES NOT EXIST BUT EMAIL EXISTS
      if (emailuser.rows.length > 0 && !emailuser.rows[0].google_id) {
        const newqueryString =
          "UPDATE users SET google_id = $1 WHERE email = $2";
        const newValues = [profile.id, profile.email];
        //UPDATE mytable
        //SET google_id = 'new_value'
        //WHERE google_id IS NULL;
        await db.query(newqueryString, newValues);
        const newemailuser = await db.query(emailqueryString, emailvalues);
        console.log("SCENARIO 2: newUser row 0: ", newemailuser.rows[0]);
        done(null, newemailuser.rows[0]);
        return;
      }

      //SCENARIO 3: BOTH DOES NOT EXIST
      else {
        const newqueryString =
          "INSERT INTO users (google_id, email, username) VALUES ($1,$2,$3) RETURNING google_id, email, username";
        const newValues = [profile.id, profile.email, profile.given_name];
        const newUser = await db.query(newqueryString, newValues);
        console.log("SCENARIO 3: newUser row 0: ", newUser.rows[0]);
        done(null, newUser.rows[0]);
      }
    console.log('profile: ', profile)
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializing user:", user);
  done(null, user.google_id);
});

passport.deserializeUser(async function (userid, done) {
  console.log("deserializing user id:", userid);
  //another database call with user id
  const desqueryString = 'SELECT _id, google_id, email, username FROM users WHERE google_id = $1';
  const desvalues = [userid];
  const desuser = await db.query(desqueryString, desvalues);
  done(null, desuser.rows[0]);
});
