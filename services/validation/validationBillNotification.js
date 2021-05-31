const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateCreateReminderNotice = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required(),
        apart_name: joi.string().required(),
        month: joi.number().valid(1,2,3,4,5,6,7,8,9,10,11,12).required(),
        year: joi.number().required(),
        total_money: joi.number().min(0).required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateCreateStopServiceNotice = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required(),
        apart_name: joi.string().required(),
        month: joi.number().valid(1,2,3,4,5,6,7,8,9,10,11,12).required(),
        year: joi.number().required(),
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateCreateConfirmNotice = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required(),
        content: joi.string().required(),
        title: joi.string().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateObjectId = async (data) =>{
    const schema = joi.object({
        notice_id: joi.objectId(),
        apart_id: joi.objectId()
    });
    const valid = await schema.validate(data);
    return valid;
}