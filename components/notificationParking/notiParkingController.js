const notiParkingServices = require('./notiParkingServices');

//GET
module.exports.getNoticeById = async (req, res, next) =>{
    try {
        const {notice_id} = req.params;
        if(notice_id==undefined){
            res.status(400).json();
        }else{
            const notice = await notiParkingServices.getNoticeById(notice_id);
            res.status(200).json({data: notice});
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
//CREATE
module.exports.createNotice = async (req, res, next) =>{
    try {
        const {title, content, user_id} = req.body;
        if(title==undefined || content==undefined || user_id==undefined){
            res.status(400).json();
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
        const notice = await notiParkingServices.changeIsRead(notice_id);
        if(notice==null){
            res.status(400).json({message: "Id incorrect"});
        }else{
            res.status(200).json({data: notice});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.changeIsConfirm = async (req, res, next) =>{
    try {
        const {notice_id} = req.body;
        const notice = await notiParkingServices.changeIsConfirm(notice_id);
        if(notice==null){
            res.status(400).json({message: "Id incorrect"});
        }else{
            res.status(200).json({data: notice});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}