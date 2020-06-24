// const express = require('express');
// const passport = require('passport');
// const Strategy = require('passport-google-oauth20').Strategy;
// const path = require('path');
// const { clientID, clientSecret } = require('../secrets');

// const router = express.Router();

// passport.use(new Strategy({
//     clientID,
//     clientSecret,
//     callbackURL: '/auth/auth/google/callback'
//   },
//   function(accessToken, refreshToken, profile, cb) {

//     // check if user is in the db (check based on Google ID)
//     // If yes, then pass user object into the done function
//     // If No user, then create the user and pass into the done function

//     console.log("accessToken", accessToken)
//     console.log("refreshToken", refreshToken)
//     console.log("profile", profile)
//     console.log("cb", cb)
//     return cb(null, profile);
//   }));


// passport.serializeUser(function(user, cb) {
//   console.log("USER: ", user)
//   cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//   // find user in DB, run callback with (err, userObject)
//   console.log("DESERIALIZE")
//   cb(null, id);
// });

// router.use(passport.initialize());
// router.use(passport.session());


// // Define routes.
// router.get('/login',
//   function(req, res){
    
//     res.sendFile(path.resolve(__dirname, '../login.html'));
//     console.log('INSIDE')
//   });

// router.get('/auth/google',
//   passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// router.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

// module.exports = router;