const blockModel = require('./block');
const mongoose = require('mongoose');
//GET
module.exports.getAllBlocks = async () =>{
    const result = await blockModel.find({'is_delete': false});
    return result;
}
module.exports.getBlockById = async (id) =>{
    const result = await blockModel.findOne({'_id': id, 'is_delete': false});
    return result;
}
module.exports.getBlockByName = async (name) =>{
    const result = await blockModel.findOne({'name': name, 'is_delete': false});
    return result;
}
//CREATE
module.exports.createBlock = async (name) =>{
    const new_block = new blockModel({name});
    return await new_block.save();
}
//UPDATE
module.exports.updateBlockById = async (block_id, name) =>{
    mongoose.set('useFindAndModify', false);
    const result = await blockModel.findOneAndUpdate({'_id': block_id},
    {$set:{'name': name}},
    {
        new: true
    });
    return result;
}