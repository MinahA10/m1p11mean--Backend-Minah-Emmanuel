const Services = require("../../models/service");

exports.getServiceList = async (req, res) => {
    try{

        const servicesList = await Services.getAllServices();
        res.status(200).json(servicesList);

    }catch(error){
        console.error('Error getting services for client:', error);
        res.status(500).json({ error: 'Could not get services for client' });
    }
}