const services = require('./pushNotificationServices');

module.exports.createNotice = async (req, res, next) =>{
    try {
        const {tokens, title, body} = req.body;
        // const tokens = [
        //     'cGPmo3W_M3hsBMGzeuEatS:APA91bEn5l-wKBGrjeOHwOgIDvI7wYOH8tDD1ZPvCz7iPodAi6E38caWs82cuKuxdrRANLM6QBviQvGPs0cDOpBr3PKuL5nn7FiJcRhBnKMWanjMUbsFGyfp6qrmA4NR2FUjQ--B6iNW'
        // ];
        if(tokens==null){
            res.status(500).json();
        }
        const notificationData = {
            title: title,
            body: body
        };
        services.sendMessageToDevices(tokens, notificationData);
        res.status(200).json();
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}