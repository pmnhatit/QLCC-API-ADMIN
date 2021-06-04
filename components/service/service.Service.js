const serviceModel = require('./service');
const mongoose = require('mongoose');
//GET
module.exports.getServices = async (data) =>{
    const {...query} = data;
    query.is_delete = false;
    const result = await serviceModel.find(query,
        null,
        {
        sort: {name: 1}
    });
    return result;
}
//CREATE
module.exports.createService = async (data) =>{
    const {...query} = data;
    const new_service = new serviceModel(query);
    return await new_service.save();
}
//UPDATE
module.exports.updateRegisted = async (service_id, registed) =>{
    mongoose.set('useFindAndModify', false);
    const result = await serviceModel.findOneAndUpdate({'_id': service_id, 'is_delete': false}, 
    {$addToSet: {registed: registed}}, 
    {
        new: true
    });
    return result;
}
module.exports.updateService = async (data) =>{
    mongoose.set('useFindAndModify', false);
    const {service_id, ...query} = data;
    const result = await serviceModel.findOneAndUpdate({'_id': service_id, 'is_delete': false}, 
    query, 
    {
        new: true
    });
    return result;
}
//DELETE
module.exports.deleteRegisted = async (service_id, user_id, date, term) =>{
    mongoose.set('useFindAndModify', false);
    const result = await serviceModel.findOneAndUpdate({'_id': service_id, 'is_delete': false}, 
    { $pull: { registed: { user_id: user_id, date: date, term: term } } }, 
    {
        new: true,
        multi: true
    });
    return result;
}