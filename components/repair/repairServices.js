const repairModel = require('./repair');
const mongoose = require('mongoose');
//GET
module.exports.getAllRepairNotices = async (page, limit) =>{
    const sk = (page-1)*limit;
    const l = parseInt(limit);
    const result = await repairModel.find({'is_delete': false},
    null,
    {
        skip: sk,
        limit: l
    }).sort({$natural: -1});
    return result;
}
module.exports.getAllRepairNoticesByIdUser = async (user_id, page, limit) =>{
    const sk = (page-1)*limit;
    const l = parseInt(limit);
    const result = await repairModel.find({'author': user_id, 'is_delete': false},
    null,
    {
        skip: sk,
        limit: l
    }).sort({$natural: -1});
    return result;
}
module.exports.getRepairNoticeById = async (notice_id) =>{
    const result = await repairModel.findOne({'_id': notice_id});
    return result;
}
//CREATE
module.exports.createRepairNotice = async (title, content, author, image) =>{
    const create_date = new Date().toLocaleString();
    const newRepairNotice = new repairModel({title, content, create_date,
        author, image});
    return await newRepairNotice.save();
}
//UPDATE
module.exports.updateNoticeStatusById = async (notice_id, status) =>{
    mongoose.set('useFindAndModify', false);
    const result = await repairModel.findOneAndUpdate({'_id': notice_id}, {$set: {'status': status}}, {
        new: true
    })
    return result;
}
module.exports.updateIsReadStatus = async(notice_id, admin, user) =>{
    mongoose.set('useFindAndModify', false);
    const result = await repairModel.findOneAndUpdate({'_id': notice_id}, {'is_read_admin': admin, 'is_read_user': user},
    {
        new: true
    })
    return result;
    
}
//DELETE
module.exports.deleteRepairNotice = async (notice_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await repairModel.findOneAndUpdate({'_id': notice_id}, {'is_delete': true},
    {
        new: true
    })
    console.log(result);
    return result;
}