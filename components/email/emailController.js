const emailServices = require('./emailServices');

module.exports.createEmailStopServices = async (req, res, next) =>{
    try {
        await emailServices.createEmailStopServices(req, res, next);
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}