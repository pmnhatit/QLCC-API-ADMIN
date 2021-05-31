const blockServices = require('./blockServices');
const {validateBlockId,validateCreateBlock,validateUpdateBlock} = require('../../services/validation/validationBlock');
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
        const valid = await validateBlockId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const block = await blockServices.getBlockById(block_id);
            res.json({data: block});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createBlock = async (req, res, next) =>{
    try {
        const {name} = req.body;
        const valid = await validateCreateBlock(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const block = await blockServices.getBlockByName(name);
            if(block){
                res.status(401).json({message:"block_exists"});
            }else{
                const new_block = await blockServices.createBlock(name);
                res.status(200).json({data: new_block});
            }
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateBlockById = async (req, res, next) =>{
    try {
        const {block_id, name} = req.body;
        const valid = await validateUpdateBlock(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const new_block = await blockServices.updateBlockById(block_id, name);
            if(new_block==null){
                res.status(400).json({message: "Block id incorrect!"});
            }else{
                res.status(200).json({data: new_block});
            }
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}