const authModel = require('./auth');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

module.exports.checkOldPassword = async (user_id, old_pass) =>{
    const user = await this.getUserById(user_id);
    const result = bcrypt.compareSync(old_pass, user.password);
    return result;
}
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
    const result = await authModel.find({'role': 1, 'is_delete': false});
    return result;
}
module.exports.getAdmin = async (data) =>{
    const {...query} = data;
    query.is_delete = false;
    const result = await authModel.find(query, {password: 0});
    return result;
}
//CREATE
module.exports.createUser = async (username, password, name, phone, email, role) =>{
    console.log("Vo create");
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new authModel({ username, password: hash, name, phone, email, role});
    return await newUser.save();
}
//UPDATE
module.exports.updateAvatar = async (user_id, avatar)=>{
    mongoose.set('useFindAndModify', false);
    const result = await authModel.findOneAndUpdate({'_id': user_id}, 
    {$set:{'avatar': avatar}},
    {
        new: true
    });
    return result;
}
module.exports.updateInfo = async (user_id, name, phone, email) =>{
    mongoose.set('useFindAndModify', false);
    const result = await authModel.findOneAndUpdate({'_id': user_id}, 
    {$set:{'name': name, 'phone': phone, 'email': email}},
    {
        new: true
    });
    return result;
}
module.exports.updateTokenDevice = async (user_id, token_device) =>{
    mongoose.set('useFindAndModify', false);
    const result = await authModel.findOneAndUpdate({'_id': user_id}, 
    {$set:{'token_device': token_device}},
    {
        new: true
    });
    return result;
} 
module.exports.changePassword = async (user_id, password) =>{
    mongoose.set('useFindAndModify', false);
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await authModel.findByIdAndUpdate({'_id': user_id},
    {'password': hash},
    {
        new:true
    });
    return result;
}
//DELETE
module.exports.deleteUser = async (user_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await authModel.findOneAndUpdate({'_id': user_id}, 
    {$set:{'is_delete': true}},
    {
        new: true
    });
    return result;
}