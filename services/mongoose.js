require('dotenv').config(); 
const mangoose = require('mongoose');

connectDB().catch(err => console.log(err));

async function connectDB() {
    await mangoose.connect(process.env.MONGODB_URL);
    console.log('DB connecte!');
}

module.exports = {
    connectDB
}