const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateGetAllApartment = async (data) =>{
    const schema = joi.object({
        name: joi.string(),
        block: joi.objectId(),
        floor: joi.number(),
        direction: joi.string(),
        type: joi.string(),
        status: joi.number().valid(1,2,3)
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateCreateApartment = async (data) =>{
    const schema = joi.object({
        name: joi.string().required(),
        block: joi.objectId().required(),
        floor: joi.number().required(),
        area: joi.number().required(),
        direction: joi.string().required(),
        type: joi.string().required(),
        description: joi.string().allow(""),
        images: joi.array().items(joi.string().allow(""))
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateApartId = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateApartment = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required(),
        name: joi.string(),
        block: joi.objectId(),
        floor: joi.number(),
        area: joi.number(),
        direction: joi.string(),
        type: joi.string(),
        status: joi.number().valid(1,2,3),
        images: joi.array().items(joi.string().allow("")),
        description: joi.string().allow("")
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateOwner = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required(),
        user_id: joi.objectId().allow("").required(),
        is_active: joi.boolean().required(),
        status: joi.number().valid(1,2)
    });
    const valid = await schema.validate(data);
    return valid;
}