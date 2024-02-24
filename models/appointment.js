const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    datetimeStart: { type: Date, required: true },
    datetimeEnd: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      default: "pending"
    },
    montant: { type: Number },
    services: {
      type: Array,
      default: []
    },
    employee: {
      type: Array,
      default: []
    },
    client: {type: String}
  });

const Appointment = mongoose.model('appointments', appointmentSchema);

module.exports = Appointment;

module.exports.getVerifyDispoEmploye = async (employeeId, dateAppointment) => {
  try {
  
      const appointments = await Appointment.find({
          "employee": employeeId,
          "datetimeStart": { $lte: new Date(dateAppointment) },
          "datetimeEnd": { $gt: new Date(dateAppointment) }
      });

      console.log(appointments.length);

      if (appointments.length > 0) {
         
          throw new Error("L'employé est déjà occupé à ce moment.");
      } else {
          return true; // L'employé est disponible
      }
  } catch (error) {
      throw error;
  }
}

  