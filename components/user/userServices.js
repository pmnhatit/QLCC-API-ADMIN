const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userModel = require('./user');

//GET
module.exports.getAllUser = async () =>{
    const result = await userModel.find({'is_delete': false});
    return result;
}
module.exports.getUserById = async (user_id) =>{
    const result = await userModel.findOne({'_id': user_id, 'is_delete': false});
    return result;
}
module.exports.getAllUserByBlockId = async (block_id) =>{
    const result = await userModel.find({'block_id': block_id, 'is_delete': false});
    return result;
}
module.exports.getUserByUsername = async (username) =>{
    const result = await userModel.findOne({'username': username, 'is_delete': false});
    return result;
}
//CREATE
module.exports.createUser = async (username, password, name, phone, email, identify_card, native_place, 
    block_id, apartment_id) =>{
        let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const new_user = new userModel({username, password: hash, name, phone, email, identify_card, 
            native_place, block_id, apartment_id});
        return await new_user.save();
    }
//UPDATE
module.exports.updateApartOfUser = async (user_id, block_id, apartment_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await userModel.findOneAndUpdate({'_id': user_id},
    {'block_id': block_id, 'apartment_id': apartment_id},
    {
        new: true
    });
    return result;
}
//DELETE
module.exports.deleteUser = async (user_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await userModel.findOneAndUpdate({'_id': user_id},
    {'is_delete': true},
    {
        new: true
    });
    return result;
}