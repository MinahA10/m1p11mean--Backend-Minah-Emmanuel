const jwt = require('jsonwebtoken');
const Employe = require('../../models/employe');
const jwtService = require('../../services/jwtService');

exports.login = async (req, res, next) => {
  const { name, password } = req.body;

  try {
    const employe = await Employe.findOne({ name });

    if (!employe) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await employe.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const jwtSecret = jwtService.generateJWTSecret();
    const token = jwt.sign({ employeId: employe._id }, jwtSecret , {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error in login:', error);
    next(error);
  }
};

exports.register = async (req, res, next) => {
  const { name, contact, speciality } = req.body;
  const photo = req.file; 

  try {
    const newEmploye = new Employe({ name, contact,speciality, photo: photo.buffer });
    await newEmploye.save();

    res.status(200).json({ message: 'Employé enregistré avec succès' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.listEmployes = async (req, res, next) => {
  try {
    const employes = await Employe.find().lean();
    employes.forEach(employe => {
      if (employe.photo) {
        // Convertir le buffer en base64
        employe.photo = `data:image/jpeg;base64,${employe.photo.toString('base64')}`;
      }
    });
    res.render('pages/listEmploye',  { layout: "auth", employes});

  } catch (error) {
    console.error(error);
    next(error);
  }
};
