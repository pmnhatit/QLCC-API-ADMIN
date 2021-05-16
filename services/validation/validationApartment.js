const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateGetAllApartment = async (data) =>{
    console.log("Validate");
    const schema = joi.object({
        type: joi.string(),
        status: joi.any().allow('1','2','3'),
    });
    const valid = await schema.validate(data);
    return valid;
}