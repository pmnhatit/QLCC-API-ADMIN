const mongoose = require('mongoose');

const apartmentModel = require('./apartment');
const authServices = require('../auth/authServices');
//const block = require('../block/block');
//GET
module.exports.getAllApartment = async () =>{
    const result = await apartmentModel.find({'is_delete': false});
    return result;
}
module.exports.getApartmentById = async (id) =>{
    const result = await apartmentModel.findOne({'_id': id, 'is_delete': false});
    return result;
}
module.exports.getApartmentsByIdUser = async (user_id) =>{
    const user = await authServices.getUserById(user_id);
    let aparts = [];
    for(let i=0; i<user.apartment_id.length; i++){
        const apart = await this.getApartmentById(user.apartment_id[i]);
        aparts.push(apart);
    }
    return aparts;
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
module.exports.updateApartment = async (apart_id, name, block, area, direction, type, images, description) =>{
    mongoose.set('useFindAndModify', false);
    const new_apart = await apartmentModel.findByIdAndUpdate({'_id': apart_id},
    {'name': name, 'block': block, 'area': area, 'direction': direction, 'type': type, 'image': images, 'description': description},
    {
        new: true
    })
    return new_apart;
}
module.exports.updateApartStatus = async (apart_id, status) =>{
    mongoose.set('useFindAndModify', false);
    const new_apart = await apartmentModel.findByIdAndUpdate({'_id': apart_id},
    {'status': status},
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
