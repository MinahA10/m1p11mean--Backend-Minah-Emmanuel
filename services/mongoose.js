require('dotenv').config(); 
const mangoose = require('mongoose');

// connectDB().catch(err => console.log(err));

async function connectDB() {
    try{
        await mangoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB connecte!');
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    connectDB
}
