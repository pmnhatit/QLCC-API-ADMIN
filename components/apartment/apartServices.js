const mongoose = require('mongoose');

const apartmentModel = require('./apartment');
const userServices = require('../user/userServices');
//const block = require('../block/block');
//GET
module.exports.getAllApartment = async (req) =>{
    const {...query} = req.query;
    query.is_delete = false;
    console.log(query);
    const result = await apartmentModel.find(query,
        null,
        {
            sort: {name: 1}
        });
        return result;
    
}
module.exports.getApartmentById = async (id) =>{
    const result = await apartmentModel.findOne({'_id': id, 'is_delete': false});
    return result;
}
module.exports.getApartmentsByIdUser = async (user_id) =>{
    const result = await apartmentModel.find({'owner.id': user_id, 'is_delete': false});
    return result;
}
module.exports.getAllApartsEmpty = async ()=>{
    const aparts = await apartmentModel.find({'status': 1, 'is_delete': false});
    return aparts;
}
//CREATE
module.exports.createApartment = async (name, block, area, direction, type, images, description) =>{
    const new_apart = new apartmentModel({name, block, area, direction, type, images, description});
    return await new_apart.save();
}
//UPDATE
module.exports.updateApartment = async (data) =>{
    const {apart_id, ...query} = data;
    mongoose.set('useFindAndModify', false);
    const new_apart = await apartmentModel.findByIdAndUpdate({'_id': apart_id, 'is_delete': false},
    query,
    {
        new: true
    })
    return new_apart;
}
//DELETE
module.exports.deleteApartment = async (apart_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await apartmentModel.findByIdAndUpdate({'_id': apart_id},
    {'is_delete': true},
    {
        new: true
    });
    return result;
}
