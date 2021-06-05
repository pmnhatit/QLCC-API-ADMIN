const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateCreateService = async (data) =>{
    const schema = joi.object({
        name: joi.string().required(),
        block_id: joi.objectId().required(),
        images: joi.array().items(joi.string().allow("")),
        description: joi.string().allow("").required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateService = async (data) =>{
    const schema = joi.object({
        service_id: joi.objectId().required(),
        name: joi.string(),
        block_id: joi.objectId(),
        images: joi.array().items(joi.string().allow("")),
        description: joi.string().allow("")
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateDeleteService = async (data) =>{
    const schema = joi.object({
        service_id: joi.objectId().required(),
        user_id: joi.objectId().required(),
        date: joi.number().required(),
        term: joi.number().valid(0,1,2).required()
    });
    const valid = await schema.validate(data);
    return valid;
}