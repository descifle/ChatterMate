const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
require('dotenv').config()

const { User } = require('./models')

const port = process.env.PORT || 3001

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
    // console.log(user)
    done(null, user)
  });

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: `http://localhost:${port}/users/auth/callback`
},
    (accessToken, refreshToken, profile, done) => {
        // User.findOrCreate({where: {googleId: profile.id}}, (err, user) => {
        //     return done(err, user)
        // }).catch(err => console.log(err))
        User.findOrCreate({where: {googleId: profile.id, userName: profile.displayName}})
        return done(null, profile)
    }))