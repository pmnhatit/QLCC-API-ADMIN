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
    const result = await repairModel.findOne({'_id': notice_id, 'is_delete': false});
    return result;
}
module.exports.getRepairNotices = async (data) =>{
    const {...query} = data;
    query.is_delete = false;
    const result = await repairModel.find(query,
        null,
        {
            sort: {create_date: -1}
        });
        return result;
}
//CREATE
//UPDATE
module.exports.updateNoticeStatusById = async (notice_id, status) =>{
    mongoose.set('useFindAndModify', false);
    const result = await repairModel.findOneAndUpdate({'_id': notice_id, 'is_delete': false}, 
    {$set: {'status': status, 'is_read_user': false}}, 
    {
        new: true
    })
    return result;
}
module.exports.updateConfirmImage = async (notice_id, image) =>{
    mongoose.set('useFindAndModify', false);
    const result = await repairModel.findOneAndUpdate({'_id': notice_id, 'is_delete': false},
    {$set: {'confirm_image': image}}, 
    {
        new: true
    })
    return result;
}
module.exports.updateIsReadStatus = async(notice_id, admin_status) =>{
    mongoose.set('useFindAndModify', false);
    const result = await repairModel.findOneAndUpdate({'_id': notice_id, 'is_delete': false}, {'is_read_admin': admin_status},
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