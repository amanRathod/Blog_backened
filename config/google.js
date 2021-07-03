const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/Login_User')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('prfile -> ', profile)
        console.log('Email -> ', profile.emails[0].value)
        
        const newUser = {
          fullName: profile.name.givenName + profile.name.familyName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        }
        try{
          let user =  await User.findOne({email: profile.emails[0].value});
          if(user){
            console.log("user exists")
            done(null, user)
          }
          else {
            user = await User.create(newUser);
            console.log('User created', user)
            done(null, user)
          }
        }
        catch(err) {
          console.error(err);
        }
      }
    )
  )


  // Passport generates some identifying token, stuff it inside a cookie and send to the user's browser.
  passport.serializeUser((user, done) => {
    done(null, user.id) // user.id is ID assigned by MONGODB
  })

  // Passport figures out the user has already been authenticated and directs the server to send the requested posts to the user's browser.
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(null, user))
  })
}




