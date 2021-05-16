const repairServices = require('./repairServices');
//GET
module.exports.getAllRepairNotices = async (req, res, next)=>{
    try {
        const {page, limit} = req.params;
        const repair_notices = await repairServices.getAllRepairNotices(page, limit);
        res.json({data: repair_notices});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getAllRepairNoticesByIdUser = async (req, res, next) =>{
    try {
        const {user_id, page, limit} = req.params;
        const repair_notices = await repairServices.getAllRepairNoticesByIdUser(user_id, page, limit);
        res.json({data: repair_notices});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getRepairNoticeById = async (req, res, next) =>{
    try {
        const {notice_id} = req.params;
        const notice = await repairServices.getRepairNoticeById(notice_id);
        res.status(200).json({data: notice});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error)
    }
}
module.exports.getRepairNotices = async (req, res, next) =>{
    try {
        const notices = await repairServices.getRepairNotices(req.query);
        res.status(200).json({data: notices});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error)
    }
}
//UPDATE
module.exports.changeStatusRepairNotice = async (req, res, next) =>{
    try {
        const {notice_id, status} = req.body;
        const new_notice = await repairServices.updateNoticeStatusById(notice_id, status);
        if(new_notice==null){
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            res.status(200).json({data: new_notice});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.updateConfirmImage = async (req, res, next) =>{
    try {
        const {notice_id, image} = req.body;
        const new_notice = await repairServices.updateConfirmImage(notice_id, image);
        if(new_notice==null){
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            res.status(200).json({data: new_notice});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.changeIsRead = async (req, res, next) =>{
    try {
        const {notice_id, admin_status} = req.body;
        const new_notice = await repairServices.updateIsReadStatus(notice_id, admin_status);
        if(new_notice==null){
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            res.status(200).json({data: new_notice});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteRepairNotice = async (req, res, next) =>{
    try {
        const {notice_id} = req.params;
        const new_notice = await repairServices.deleteRepairNotice(notice_id);
        if(new_notice.is_delete==true){
            res.status(200).json();
        }else{
            res.status(500).json({message: "Cann't delete!"});
        }
        
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}