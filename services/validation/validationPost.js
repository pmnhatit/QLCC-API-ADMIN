const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateObjectId = async (data) =>{
    const schema = joi.object({
        post_id: joi.objectId().required(),
        reason: joi.string()
    });
    const valid = await schema.validate(data);
    return valid;
}