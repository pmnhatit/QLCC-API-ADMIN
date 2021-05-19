const mongoose = require('mongoose');

const notiModel = require('./notification');
const userServices = require('../user/userServices');
//GET
module.exports.getAllNotification = async (page, limit)=>{
    const sk = (page-1)*limit;
    const l = parseInt(limit);
    const result = await notiModel.find({'is_delete': false},
        null,{
            skip: sk,
            limit: l,
            sort: {create_date: -1}
        });
    return result;
}
//CREATE
module.exports.createNotification = async (title, content, image, link, receivers) =>{
    const d = new Date();
    const create_date = d.valueOf();
    const newNoti = new notiModel({title, content, image, link, create_date, receivers});
    return await newNoti.save();
}
//UPDATE
module.exports.updateNotification = async (noti_id, title, content, image, link) =>{
    mongoose.set('useFindAndModify', false);
    const result = await notiModel.findOneAndUpdate({'_id': noti_id},
    {'title': title, 'content': content, 'image': image, 'link': link},
    {
        new: true
    });
    return result;
}
//DELETE
module.exports.deleteNotification = async (noti_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await notiModel.findOneAndUpdate({'_id': noti_id},
    {'is_delete': true},
    {
        new: true
    });
    return result;
}