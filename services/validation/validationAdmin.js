const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateGetAdmin = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId(),
        role: joi.number().valid(0,1,2),
        username: joi.string()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateCreateAdmin = async (data) =>{
    const schema = joi.object({
        username: joi.string().min(1).max(50).required(),
        password: joi.string().required(),
        name: joi.string().min(1).max(50).required(),
        phone: joi.string().max(10).required(),
        email: joi.string().email({tlds: { allow: ['com', 'net'] }}).required(),
        role: joi.number().valid(1,2).required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateInfo = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        name: joi.string().min(1).max(50).required(),
        phone: joi.string().max(10).required(),
        email: joi.string().email({tlds: { allow: ['com', 'net'] }}).required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateAvatar = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        avatar: joi.string().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateTokenDevice = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        token_device: joi.string().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateChangePass = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        new_pass: joi.string().required(),
        old_pass: joi.string().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateDelete = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}