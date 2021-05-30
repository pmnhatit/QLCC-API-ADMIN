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