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
module.exports.getUserInactive = async () =>{//chua test
    const users = await userModel.find({'is_active': false, 'is_delete': false});
    return users;
}
module.exports.getTokenDeviceByApartId = async (apart_id) =>{
    const user = await userModel.findOne({'apartment_id': apart_id, 'is_delete': false});
    return user;
}
//CREATE
module.exports.createUser = async (username, name, phone, email, identify_card, native_place, 
    block_id, apartment_id, license_plates) =>{
        let hash = bcrypt.hashSync(phone, bcrypt.genSaltSync(10));//pass la phone
        const new_user = new userModel({username, password: hash, name, phone, email, identify_card, 
            native_place, block_id, apartment_id, license_plates});
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
module.exports.updateLicensePlates = async (user_id, license_plates) =>{
    mongoose.set('useFindAndModify', false);
    const result = await userModel.findOneAndUpdate({'_id': user_id},
    {'license_plates': license_plates},
    {
        new: true
    });
    return result;
}
module.exports.changeActiveStatus = async (user_id, status) =>{
    mongoose.set('useFindAndModify', false);
    const result = await userModel.findOneAndUpdate({'_id': user_id},
    {'is_active': status},
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
//SEARCH
module.exports.searchByLicensePlate = async (search) =>{
    const result = await userModel.find({$text: {$search: search}});
    return result;
}