const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

exports.validateChangeStatusRepairNotice = async (data) =>{
    const schema = joi.object({
        notice_id: joi.objectId().required(),
        status: joi.number().valid(0,1,2,3).required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateUpdateConfirmImage = async (data) =>{
    const schema = joi.object({
        notice_id: joi.objectId().required(),
        image: joi.string().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateChangeIsRead = async (data) =>{
    const schema = joi.object({
        notice_id: joi.objectId().required(),
        admin_status: joi.boolean().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validateObjectId = async (data) =>{
    const schema = joi.object({
        notice_id: joi.objectId().required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validategetAllRepairNoticesByUserId = async (data) =>{
    const schema = joi.object({
        user_id: joi.objectId().required(),
        page: joi.number().min(1).required(),
        limit: joi.number().min(1).required()
    });
    const valid = await schema.validate(data);
    return valid;
}
exports.validategetAllRepairNotices = async (data) =>{
    const schema = joi.object({
        page: joi.number().min(1).required(),
        limit: joi.number().min(1).required()
    });
    const valid = await schema.validate(data);
    return valid;
}