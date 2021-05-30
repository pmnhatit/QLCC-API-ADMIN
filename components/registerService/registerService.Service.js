const mongoose = require('mongoose');

const registerServiceModel = require('./registerService');
const serviceModel = require('../service/service.Service');

//GET
module.exports.getRegisterService = async (data) =>{
    const {...query} = data;
    query.is_delete = false;
    const result = await registerServiceModel.find(query);
    return result;
}
//CREATE
module.exports.createRegister = async (content, user_id, service_id, date, term) =>{
    const is_read_admin = false, is_read_user = true, status = 0;
    const d = new Date();
    const create_date = d.valueOf();
    const new_register = new registerServiceModel({content, user_id, service_id, date, term, is_read_admin, 
        is_read_user, status, create_date});
    return await new_register.save();
}
//UPDATE
module.exports.changeIsRead = async (register_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await registerServiceModel.findOneAndUpdate({'_id': register_id, 'is_delete': false}, 
    {'is_read_admin': true}, 
    {
        new: true
    });
    return result;
}
module.exports.updateRejectService = async (register_id, reason) =>{
    mongoose.set('useFindAndModify', false);
    const result = await registerServiceModel.findOneAndUpdate({'_id': register_id, 'is_delete': false}, 
    {'reason': reason, 'status': 2, 'is_read_admin': true, 'is_read_user': false}, 
    {
        new: true
    });
    return result;
}
module.exports.updateConfirmRegister = async (register_id, service_id, registed) =>{
    mongoose.set('useFindAndModify', false);
    const service = await serviceModel.updateRegisted(service_id, registed);
    if(service==null){
        return null;
    }else{
        const result = await registerServiceModel.findOneAndUpdate({'_id': register_id, 'is_delete': false}, 
        {'status': 1, 'is_read_admin': true, 'is_read_user': false}, 
        {
            new: true
        });
        return result;
    }
}