const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateCreateBlock = async (data) =>{
    const schema = joi.object({
        name: joi.string().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateBlock = async (data) =>{
    const schema = joi.object({
        block_id: joi.objectId().required(),
        name: joi.string().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateBlockId = async (data) =>{
    const schema = joi.object({
        block_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}