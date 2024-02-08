const jwt = require('jsonwebtoken');
const Client = require('../models/client');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    const isPasswordValid = await client.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ clientId: client._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error in login:', error);
    next(error);
  }
};

exports.register = async (req, res, next) => {
  const { name,email, password, contact, address} = req.body;

  try {
    const existingUser = await Client.findOne({ name });

    if (existingUser) {
      return res.status(400).json({ message: 'user is already taken' });
    }

    const newClient = new Client({ name,email, password, contact, address});
    await newClient.save();

    const token = jwt.sign({ userId: newClient._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
