const express = require('express');
const router = express.Router();
const Timer = require('../models/Timer');
const nodemailer = require('nodemailer');
const { ensureAuthenticated } = require('../config/auth');

// Route pour la page d'accueil
router.get('/', (req, res) => res.render('index'));

// Route pour le tableau de bord
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

// Route pour démarrer un minuteur
router.post('/start-timer', ensureAuthenticated, async (req, res) => {
  const { duration } = req.body; // Durée en minutes
  const endTime = new Date(Date.now() + duration * 60000);

  const timer = new Timer({
    userId: req.user.id,
    endTime,
  });

  await timer.save();

  setTimeout(async () => {
    const user = req.user;
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password',
      },
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: user.email,
      subject: 'Minuteur terminé',
      text: 'Votre minuteur est terminé.',
    };

    await transporter.sendMail(mailOptions);
  }, duration * 60000);

  res.redirect('/dashboard');
});

module.exports = router;
