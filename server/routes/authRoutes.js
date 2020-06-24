const express = require('express');
const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;
const path = require('path');
const { clientID, clientSecret } = require('../secrets');
const db = require('../models/inventoryModel');
const { doesNotMatch } = require('assert');


const router = express.Router();

passport.use(new Strategy({
    clientID,
    clientSecret,
    callbackURL: '/auth/google/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      let { rows } = await db.query(`
      SELECT * 
      FROM users
      WHERE google_id = $1`, 
      [profile.id])

      let created = rows[0];
      
      if(!created){
        let { rows } = await db.query(`INSERT INTO users (firstname, lastname, username, isadmin, google_id)
                  VALUES ($1, $2, $3, $4, $5) RETURNING *;`, 
                  [profile.name.givenName, profile.name.familyName, profile.name.givenName + profile.name.familyName, 'false', profile.id])
        created = rows[0];   
      }
      done(null, created)
    } catch (error) {
      console.log(error.message)
    }
  }));





passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
  console.log('check inside deserialize')
  // find user in DB, run callback with (err, userObject)
  let { rows } = await db.query(`
      SELECT * 
      FROM users
      WHERE id = $1`, 
      [id])

  cb(null, rows[0]);
});


// Define routes.
router.get('/login',
  function(req, res){
    
    res.sendFile(path.resolve(__dirname, '../login.html'));
  });

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;