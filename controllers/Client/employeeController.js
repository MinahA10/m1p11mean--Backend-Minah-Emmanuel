const User = require("../../models/user");

exports.getEmployeList = async (req, res) => {
    try{
        const userList = await User.find({ role: 0});
        res.status(200).json(userList);

    }catch(error){
        console.error('Error getting employees for client:', error);
        res.status(500).json({ error: 'Could not get employees for client' });
    }
}