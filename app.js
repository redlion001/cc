const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Initialisation de l'application
const app = express();

// Configuration de la base de données
mongoose.connect('mongodb://localhost:27017/timer-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// Initialiser Passport.js
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Configuration du moteur de templates
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Configuration des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
