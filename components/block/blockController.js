const blockServices = require('./blockServices');
//GET
module.exports.getAllBlocks = async (req, res, next) =>{
    try {
        const blocks = await blockServices.getAllBlocks();
        res.json({data: blocks});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getBlockById = async (req, res, next) =>{
    try {
        const {block_id} = req.params;
        const block = await blockServices.getBlockById(block_id);
        res.json({data: block});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createBlock = async (req, res, next) =>{
    try {
        const {name} = req.body;
        const new_block = await blockServices.createBlock(name);
        res.status(201).json({data: new_block});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateBlockById = async (req, res, next) =>{
    try {
        const {block_id, name} = req.body;
        const new_block = await blockServices.updateBlockById(block_id, name);
        res.status(200).json({data: new_block});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}