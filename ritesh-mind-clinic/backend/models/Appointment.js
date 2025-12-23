const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Appointment',
  new mongoose.Schema({
    name: String,
    service: String
  })
);
