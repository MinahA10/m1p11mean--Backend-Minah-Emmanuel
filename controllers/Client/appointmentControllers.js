const Appointment = require('../../models/appointment');
const { verifyToken } = require('../../middlewares/authJWT');
const Client = require('../../models/client');
const { timeToMinute,addMinutesToDate } = require('../../models/fonction')

// const moment = require('moment');

exports.verifyAvailability = async (req, res) => {
  try {
    const { employeeId, dateAppointment } = req.body;
    
    const isAvailable = await Appointment.getVerifyDispoEmploye(employeeId, dateAppointment);

    res.status(200).json({ available: isAvailable });
  } catch (error) {
      console.error("Erreur lors de la vérification de la disponibilité de l'employé :", error);
      res.status(500).json({ error: "Une erreur s'est produite lors de la vérification de la disponibilité de l'employé." });
  }
}

exports.createAppointment = async (req, res, next) => {
  try {
    
      await verifyToken(req, res, next);

      const userId = req.user._id; 
    
      const { datetimeStart, services, employee } = req.body;

      let totalDuration = 0;
      let montant = 0;

      services.forEach(service => {
        let getToMInute = timeToMinute(service.duration);
        totalDuration += parseInt(getToMInute);
        montant += service.price;
      });
      
      const datetimeEnd = addMinutesToDate(datetimeStart,totalDuration);
      
  
      const newAppointment = await Appointment.create({
          datetimeStart,
          datetimeEnd,
          status: "pending",
          montant,
          services,
          employee,
          client: userId 
      });

      await Client.findByIdAndUpdate(userId, { $push: { appointments: newAppointment._id } });

    
      res.status(201).json(newAppointment);
      
  } catch (error) {
      console.error("Error creating appointment:", error);
      next(error);
  }
};

exports.listAppointment = async (req, res,next) => {
    try {
    
        verifyToken(req, res);
          const userId = req.user._id; 
        
          const user = await Client.findById(userId);
          if (!user) {
            return res.status(404).json({ error: 'Client not found' });
          }
    
          const appointments = await Appointment.find({ _id: { $in: user.appointments } });
    
          res.status(200).json(appointments);
        
      } catch (error) {
        console.error('Error getting appointments for client:', error);
        res.status(500).json({ error: 'Could not get appointments for client' });
      }
};