const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const app = express();
const PORT = 5000;

const FACEBOOK_APP_ID = "Input_FACEBOOK_APP_ID"
const FACEBOOK_APP_SECRET = "Input_FACEBOOK_APP_SECRET"


passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/facebook",
    profileFields: ['emails', 'displayName', 'name', 'picture']
  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null, profile)
  }
));

passport.serializeUser((user, callback) => {
    callback(null, user);
})

passport.deserializeUser((user, callback) => {
    callback(null, user)
})

app.use(expressSession({
    secret: 'testsystemnaja',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session())

// Route

app.get('/login/facebook', passport.authenticate('facebook'))
app.get('/facebook', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.send(req.user ? req.user : 'Not login with Facebook\n<a href="/login/facebook">Login with Facebook</a>')
})

app.get('/logout', (req, res) => {
    req.logout((err) => {});
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})