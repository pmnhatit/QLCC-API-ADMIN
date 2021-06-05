const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateCreateUser = async (data) =>{
    const schema = joi.object({
        name: joi.string().required(),
        phone: joi.string().max(10).required(),
        email: joi.string().email({tlds: { allow: ['com', 'net'] }}).required(),
        identify_card: joi.string().required(),
        native_place: joi.string().required(),
        block_id: joi.array().items(joi.objectId().allow("")),
        apartment_id: joi.array().items(joi.objectId().allow("")),
        license_plates: joi.array().items(joi.string().allow(""))
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateApartOfUser = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        block_id: joi.array().items(joi.objectId().allow("")),
        apartment_id: joi.array().items(joi.objectId().allow(""))
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateLicensePlates = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        license_plates: joi.array().items(joi.string().allow(""))
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUserId = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}