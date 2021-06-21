const notiServices = require('./notiServices');
const userServices = require('../user/userServices');
const apartServices = require('../apartment/apartServices');
const {validateCreateNotification,
    validateDeleteNotification,
    validateUpdateNotification} = require('../../services/validation/validationNotification');
const { parseString } = require('fast-csv');
//GET
module.exports.getAllNotification = async (req, res, next) =>{
    try {
        const {page, limit} = req.params;
        const result = await notiServices.getAllNotification(req.query, page, limit);
        res.status(200).json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getNotificationById = async (req, res, next) =>{
    try {
        const {noti_id} = req.params;
        const noti = await notiServices.getNotificationById(noti_id);
        res.status(200).json({data: noti});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createNotification = async (req, res, next) =>{
    try {
        const {title, content, type, image, link, ...query} = req.body;
        const valid = await validateCreateNotification(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            let receivers = [], aparts = [], ids = [];
            let q = {status: 2};
            if(type==="all"){
                aparts = await apartServices.getAllApartment(q);
            }else if(type==="block"){
                // q = {block: query.block_id};
                q.block = query.block_id;
                aparts = await apartServices.getAllApartment(q);
            }else if(type==="floor"){
                const floor = query.floor;
                if(floor==1){
                    const floors = [floor, floor+1];
                    aparts = await apartServices.getApartsByFloor(query.block_id, floors, query.apart_id);
                }else{
                    const floors = [floor-1, floor, floor+1];
                    aparts = await apartServices.getApartsByFloor(query.block_id, floors, query.apart_id);
                }
            }else{
                aparts[0] = await apartServices.getApartmentById(query.apart_id);
            }
            console.log(aparts.length);
            for(let i=0; i<aparts.length; i++){
                const apart = {
                    apart_id : aparts[i]._id
                }
                receivers.push(apart);
                ids.push(aparts[i].owner.id);
            }
            const tokens_device = await userServices.getTokenDevice(ids);
            const newNoti = await notiServices.createNotification(title, content, image, link, receivers);
            res.status(200).json({data: newNoti, tokens_device: tokens_device});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateNotification = async (req, res, next) =>{
    try {
        const {noti_id, title, content, image, link} = req.body;
        const valid = await validateUpdateNotification(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const noti = await notiServices.updateNotification(noti_id, title, content, image, link);
            if(noti==null){
                res.status(400).json({message: "Notification id incorrect!"});
            }else{
                res.status(200).json({data: noti});
            }
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteNotification = async (req, res, next) =>{
    try {
        const {noti_id} = req.params;
        const valid = await validateDeleteNotification(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const noti = await notiServices.deleteNotification(noti_id);
            if(noti){
                res.status(200).json();
            }else{
                res.status(400).json({message: "Cann't delete!"});
            }
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}