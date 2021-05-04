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
module.exports.getNotiStopService = async (req, res, next) =>{
    try {
        const {status} = req.params;
        const notis = await billNotiServices.getNotiStopService(status);
        res.status(200).json({data: notis});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createReminderNotice = async (req, res, next) =>{
    try {
        const {apart_id, apart_name, month, year, total_money} = req.body;
        const noti = await billNotiServices.createReminderNotice(apart_id, apart_name, month, year, total_money);
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
module.exports.createStopServiceNotice = async (req, res, next) =>{
    try {
        const {apart_id, apart_name, month, year} = req.body;
        const noti = await billNotiServices.createStopServiceNotice(apart_id, apart_name, month, year);
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
module.exports.createConfirmNotice = async (req, res, next) =>{
    try {
        const {apart_id, apart_name} = req.body;
        const noti = await billNotiServices.createConfirmNotice(apart_id, apart_name);
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
//UPDATE
module.exports.changeConfirmStatus = async (req, res, next) =>{
    try {
        const {notice_id} = req.body;
        const noti = await billNotiServices.changeConfirmStatus(notice_id);
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