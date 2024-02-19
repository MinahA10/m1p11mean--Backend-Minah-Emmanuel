const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const jwtService = require('../../services/jwtService');
const fonction = require('../../models/fonction');

// exports.login = async (req, res, next) => {
//   const { name, password } = req.body;

//   try {
//     const employe = await User.findOne({ name });

//     if (!employe) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const isPasswordValid = await employe.comparePassword(password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const jwtSecret = jwtService.generateJWTSecret();
//     const token = jwt.sign({ employeId: employe._id }, jwtSecret , {
//       expiresIn: '1h',
//     });

//     res.json({ token });
//   } catch (error) {
//     console.error('Error in login:', error);
//     next(error);
//   }
// };

async function register(req, res, next) {
    const urlApp = req.protocol + '://' + req.get('host');
    const fileName = req.files[0].filename;
    const speciality = req.body.speciality || [];
    const dataUser = {
      firstName: req.body.firstName.trim().toUpperCase(),
      lastName: fonction.ucwords(req.body.lastName.trim()),
      email: req.body.email.trim(),
      password: '123456',
      contact: fonction.listContact(req.body.contact1.trim(), req.body.contact2.trim()),
      photo: urlApp+'/images/users/'+ fileName,
      speciality: speciality,
    };
    console.log(dataUser);
      try{
        const userModel = new User(dataUser);
        await userModel.save();
        res.redirect('/auth/employes');
    }catch(err){
        res.status(500).render("pages/error/error-500");
    }
};

async function listEmployes(req, res, next) {
  try {
    const employes = await User.find({role: 0}).lean();
    res.render('pages/employes/list',  { layout: "auth", title: "Page liste employé", page: "Liste des employés", employes});

  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {register, listEmployes};
