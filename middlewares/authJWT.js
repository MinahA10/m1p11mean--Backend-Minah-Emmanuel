const jwt = require("jsonwebtoken");
const jwtService = require('../services/jwtService');
const Client = require('../models/client');

// Middleware to verify user token
exports.verifyToken = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1]; 
    
    const jwtSecret = process.env.JWT_SECRET;
   
    const decoded = jwt.verify(token, jwtSecret);

    const user = await Client.findById(decoded.clientId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    
    next();

  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized' });
    next(error);
  }
};
