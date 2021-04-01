const notiModel = require('./notification');
const authServices = require('../auth/authServices');
//GET
module.exports.getAllNotification = async (page, limit)=>{
    const sk = (page-1)*limit;
    const l = parseInt(limit);
    const result = notiModel.find(null,
        null,{
            skip: sk,
            limit: l
        }).sort({$natural: -1});
    return result;
}
module.exports.getNotificationByUserId = async (user_id, page, limit) =>{
    const sk = (page-1)*limit;
    const l = parseInt(limit);
    const result = notiModel.find({'receivers.user_id': user_id},null,
        {
            skip: sk,
            limit: l
        }).sort({$natural: -1});
    console.log(result);
    return result;
}
//CREATE
module.exports.createNotification = async (title, content, image, link, type) =>{
    let receivers = [];
    if(type==="0"){
        const users = await authServices.getAllUser();
        for(let i=0; i<users.length; i++){
            const receiver = {
                user_id: users[i]._id            
            }
            receivers.push(receiver);
        }
    }else{
        const users = await authServices.getAllUserByBlockId(type);
        for(let i=0; i<users.length; i++){
            const receiver = {
                user_id: users[i]._id            
            }
            receivers.push(receiver);
        }
    }
    const create_date = new Date().toLocaleString();
    const newNoti = new notiModel({title, content, image, link, create_date, type, receivers});
    return await newNoti.save();
}