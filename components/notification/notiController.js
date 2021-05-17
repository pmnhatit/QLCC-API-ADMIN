const notiServices = require('./notiServices');
const userServices = require('../user/userServices');
const apartServices = require('../apartment/apartServices');
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
// module.exports.createNotification = async (req, res, next) =>{
//     try {
//         const {title, content, type, image, link} = req.body;
//         const newNoti = await notiServices.createNotification(title, content, image, link, type);
//         // console.log("new: ",newNoti);
//         res.status(200).json({data: newNoti});
//     } catch (error) {
//         console.log("errors: ", error);
//         res.status(500).json(error);
//     }
// }
module.exports.createNotification = async (req, res, next) =>{
    try {
        const {title, content, type, image, link, ...query} = req.body;
        let receivers = [], users, aparts;
        let q = {};
        if(type==="all"){
            // users = await userServices.getAllUser();
            aparts = await apartServices.getAllApartment(q);
        }else if(type==="block"){
            // users = await userServices.getAllUserByBlockId(query.block_id);
            q = {block: query.block_id};
            aparts = await apartServices.getAllApartment(q);
        }else if(type==="floor"){//chua xong
            const floor = query.floor;
            if(floor==1){
                const floors = [floor, floor+1];
                console.log("floors: ", floors);
                aparts = await apartServices.getApartsByFloor(query.block_id, floors);
                console.log('aparts', aparts);
            }else{
                const floors = [floor-1, floor, floor+1];
                console.log('floors', floors);
                aparts = await apartServices.getApartsByFloor(query.block_id, floors);
                console.log('aparts', aparts);
            }
        }else{
            users = await userServices.getUserById(query.user_id);
        }
        if(aparts){
            for(let i=0; i<aparts.length; i++){
                if(aparts[i].owner.id != "" && !receivers.includes(aparts[i].owner.id)){
                    const user = {
                        user_id : aparts[i].owner.id
                    }
                    receivers.push(user);
                }
            }
        }else{
            const user = {user_id: users._id};
            receivers.push(user);
        }
        console.log("receivers", receivers);
        const newNoti = await notiServices.createNotification(title, content, image, link, receivers);
        res.status(200).json({data: newNoti});
    } catch (error) {
        console.log("errors: ",error);
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