const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateCreateElectricBill = async (data) =>{
    const schema = joi.object({
        apart_id: joi.objectId().required(),
        new_index: joi.number().min(0).required(),
        month: joi.number().valid(1,2,3,4,5,6,7,8,9,10,11,12).required(),
        year: joi.number().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateImportBill = async (data) =>{
    const schema = joi.object({
        key: joi.string().required(),
        month: joi.number().valid(1,2,3,4,5,6,7,8,9,10,11,12).required(),
        year: joi.number().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
