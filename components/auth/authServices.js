const authModel = require('./auth');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
//GET
module.exports.getUserByUsername = async (username) =>{
    const result = await authModel.findOne({'username': username, 'is_delete': false});
    return result;
}
module.exports.getUserById = async (user_id) =>{
    const result = await authModel.findOne({'_id': user_id, 'is_delete': false});
    return result;
}
module.exports.getAllUser = async ()=>{
    const result = await authModel.find({'auth': 2, 'is_delete': false});
    return result;
}
module.exports.getAllUserByBlockId = async (block_id) =>{
    const result = await authModel.find({'block_id': block_id, 'is_delete': false});
    return result;
}
//CREATE
module.exports.createUser = async (username, password, name, phone, email) =>{
    console.log("Vo create");
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new authModel({ username, password: hash, name, phone, email});
    return await newUser.save();
}
//UPDATE
module.exports.updateAvatar = async (user_id, avatar)=>{
    const result = await authModel.updateOne({'_id': user_id},{$set: {'avatar': avatar}}, (err, doc)=>{
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    })
}
module.exports.updateInfo = async (user_id, name, phone, email, identify_card, native_place) =>{
    mongoose.set('useFindAndModify', false);
    const result = await authModel.findOneAndUpdate({'_id': user_id}, 
    {$set:{'name': name, 'phone': phone, 'email': email, 'identify_card': identify_card, 'native_place': native_place}},
    {
        new: true
    })
    return result;
}
module.exports.updateTokenDevice = async (user_id, token_device) =>{
    const result = await authModel.updateOne({'_id': user_id},{$set: {'token_device': token_device}}, (err, doc)=>{
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    })
} 
// module.exports.updateBlockId = async (user_id, block_id) =>{
//     mongoose.set('useFindAndModify', false);
//     const result = await authModel.findOneAndUpdate({'_id': user_id}, 
//     {$set:{'block_id': block_id}},
//     {
//         new: true
//     })
//     return result;
// }
//DELETE