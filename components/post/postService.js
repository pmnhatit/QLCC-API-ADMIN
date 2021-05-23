const postModel = require('./post');
const mongoose = require('mongoose');

//GET
module.exports.getPost = async (data) =>{
    const {...query} = data;
    query.is_delete = false;
    const result = await postModel.find(query,
        null,
        {
            sort: {create_date: -1}
        });
    return result;
}
//UPDATE
module.exports.confirmPost = async (post_id)=>{
    mongoose.set('useFindAndModify', false);
    const result = await postModel.findOneAndUpdate({'_id': post_id, 'is_delete': false}, 
    {'status': 1}, 
    {
        new: true
    });
    return result;
}
module.exports.rejectPost = async (post_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await postModel.findOneAndUpdate({'_id': post_id, 'is_delete': false}, 
    {'status': 2}, 
    {
        new: true
    });
    return result;
}
module.exports.changeIsRead = async (post_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await postModel.findOneAndUpdate({'_id': post_id, 'is_delete': false}, 
    {'is_read': true}, 
    {
        new: true
    });
    return result;
}
