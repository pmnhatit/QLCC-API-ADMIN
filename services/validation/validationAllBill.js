const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateChangeStatus = async (data) =>{
    const schema = joi.object({
        bill_id: joi.objectId().required(),
        status: joi.boolean().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateMonthYear = async (data) =>{
    const schema = joi.object({
        month: joi.number().valid(1,2,3,4,5,6,7,8,9,10,11,12),
        year: joi.number()
    });
    const valid = await schema.validate(data);
    return valid;
}