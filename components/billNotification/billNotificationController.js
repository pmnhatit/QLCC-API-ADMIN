const billNotiServices = require('./billNotificationServices');
//GET
module.exports.getNotiById = async (req, res, next) =>{
    try {
        const {noti_id} = req.params;
        const noti = await billNotiServices.getNotiById(noti_id);
        res.status(200).json({data: noti});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getNotiByApartId = async (req, res, next) =>{
    try {
        const {apart_id} = req.params;
        const {limit, page} = req.query;
        const notis = await billNotiServices.getNotiByApartId(apart_id, page, limit);
        res.status(200).json({data: notis});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createBillNotification = async (req, res, next) =>{
    try {
        const {apart_id, title, content} = req.body;
        const noti = await billNotiServices.createBillNotification(apart_id, title, content);
        if(noti){
            res.status(200).json({data: noti});
        }else{
            res.status(400).json();
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}