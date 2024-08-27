const mongoose = require('mongoose');

// Schéma de minuteur
const TimerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model('Timer', TimerSchema);
