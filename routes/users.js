const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Route pour la création de compte
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = new User({ firstName, lastName, email, password });
  await user.save();
  res.redirect('/login');
});

// Route pour la connexion
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: false
}));

module.exports = router;
