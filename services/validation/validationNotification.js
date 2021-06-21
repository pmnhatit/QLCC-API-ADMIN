const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateCreateNotification = async (data) =>{
    const schema = joi.object({
        title: joi.string().required(),
        content: joi.string().required(),
        type: joi.string().valid("all", "block", "floor", "apart").required(),
        image: joi.string().allow(""),
        link: joi.string().allow(""),
        block_id: joi.objectId(),
        floor: joi.number(),
        apart_id: joi.objectId()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateNotification = async (data) =>{
    const schema = joi.object({
        noti_id: joi.objectId().required(),
        title: joi.string().required(),
        content: joi.string().required(),
        image: joi.string().allow(""),
        link: joi.string().allow(""),
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateDeleteNotification = async (data) =>{
    const schema = joi.object({
        noti_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}