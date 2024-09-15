const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true,
   },
   lastname: {
      type: String,
      required: true,
   },
   datetime: {
      type: Date,
      required: true,
   },
   barber: {
      type: String,
      required: true,
   },
   service: {
      type: String,
      required: true,
   }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
