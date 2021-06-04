const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateCreate = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        service_id: joi.objectId().required(),
        content: joi.string().required(),
        date: joi.number().required(),
        term: joi.number().valid(0,1,2)
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateRejectService = async (data) =>{
    const schema = joi.object({
        register_id: joi.objectId().required(),
        reason: joi.string().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateConfirmRegister = async (data) =>{
    const schema = joi.object({
        register_id: joi.objectId().required(),
        service_id: joi.objectId().required(),
        registed: joi.object({
            term: joi.number().valid(0,1,2).required(),
            date: joi.number().required(),
            user_id: joi.objectId().required()
        })
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateChangeIsRead = async (data) =>{
    const schema = joi.object({
        register_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateDeleteRegister = async (data) =>{
    const schema = joi.object({
        register_id: joi.objectId().required(),
        service_id: joi.objectId().required(),
        user_id: joi.objectId().required(),
        date: joi.number().required(),
        term: joi.number().valid(0,1,2).required()
    });
    const valid = await schema.validate(data);
    return valid;
}