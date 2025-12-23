const Appointment = require('../models/Appointment');

exports.getAll = async (_, res) => {
  res.json(await Appointment.find());
};
