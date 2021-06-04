const notiParkingServices = require('./notiParkingServices');
const {validateCreateNotification,
    validateObjectId} = require('../../services/validation/validationNotificationParking');

//GET
module.exports.getNoticeById = async (req, res, next) =>{
    try {
        const {notice_id} = req.params;
        const valid = await validateObjectId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            const notice = await notiParkingServices.getNoticeById(notice_id);
            if(notice==null){
                res.status(400).json({message: "Notice id incorrect!"});
            }else{
                res.status(200).json({data: notice});
            }
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getNoticesReport = async (req, res, next) =>{
    try {
        const notices = await notiParkingServices.getNoticesReport();
        res.status(200).json({data: notices});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getNoticesUnconfirm= async (req, res, next) =>{
    try {
        const notices = await notiParkingServices.getNoticesUnconfirm();
        res.status(200).json({unconfirm: notices.length});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
// module.exports.getNoticesUnread = async (req, res, next) =>{
//     try {
//         const notices = await notiParkingServices.getNoticesUnread();
//         res.status(200).json({unread: notices.length});
//     } catch (error) {
//         console.log("errors: ", error);
//         res.status(500).json(error);
//     }
// }
//CREATE
module.exports.createNotice = async (req, res, next) =>{
    try {
        const {title, content, user_id} = req.body;
        const valid = await validateCreateNotification(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notice = await notiParkingServices.createNotice(user_id, title, content);
            res.status(200).json({data: notice});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.changeIsRead = async (req, res, next) =>{
    try {
        const {notice_id} = req.body;
        const valid = await validateObjectId(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notice = await notiParkingServices.changeIsRead(notice_id);
            if(notice==null){
                res.status(400).json({message: "Id incorrect"});
            }else{
                res.status(200).json({data: notice});
            }
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.changeIsConfirm = async (req, res, next) =>{
    try {
        const {notice_id} = req.body;
        const valid = await validateObjectId(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const notice = await notiParkingServices.changeIsConfirm(notice_id);
            if(notice==null){
                res.status(400).json({message: "Id incorrect"});
            }else{
                res.status(200).json({data: notice});
            }
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}