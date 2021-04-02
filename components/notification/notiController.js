const notiServices = require('./notiServices');
//GET
module.exports.getAllNotification = async (req, res, next) =>{
    try {
        const {page, limit} = req.params;
        const result = await notiServices.getAllNotification(page, limit);
        res.json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createNotification = async (req, res, next) =>{
    try {
        const {title, content, type, image, link} = req.body;
        const newNoti = await notiServices.createNotification(title, content, image, link, type);
        // console.log("new: ",newNoti);
        res.status(200).json({data: newNoti});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateNotification = async (req, res, next) =>{
    try {
        const {noti_id, title, content, image, link} = req.body;
        const noti = await notiServices.updateNotification(noti_id, title, content, image, link);
        res.status(200).json({data: noti});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteNotification = async (req, res, next) =>{
    try {
        const {noti_id} = req.params;
        const noti = await notiServices.deleteNotification(noti_id);
        if(noti.is_delete==true){
            res.status(200).json();
        }else{
            res.status(500).json({message: "Cann't delete!"});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}