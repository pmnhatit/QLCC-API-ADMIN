const registerService = require('./registerService.Service');
const service_Services = require('../service/service.Service');
const {validateChangeIsRead,
    validateCreate,
    validateUpdateConfirmRegister,
    validateUpdateRejectService,
    validateDeleteRegister} = require('../../services/validation/validationRegisterService');

//GET
module.exports.getRegisterService = async (req, res, next) =>{
    try {
        const registers = await registerService.getRegisterService(req.query);
        res.status(200).json({data: registers});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.countRegisterService = async (req, res, next) =>{
    try {
        const registers = await registerService.getRegisterService(req.query);
        res.status(200).json({count: registers.length});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createRegisterService = async (req, res, next) =>{
    try {
        const {content, user_id, service_id, date, term} = req.body;
        const valid = await validateCreate(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const register = await registerService.createRegister(content, user_id, service_id, date, term);
            res.status(200).json({data: register});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateRejectService = async (req, res, next) =>{
    try {
        const {register_id, reason} = req.body;
        const valid = await validateUpdateRejectService(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const register = await registerService.updateRejectService(register_id, reason);
            if(register==null){
                res.status(400).json({message: "Register id incorrect!"});
            }else{
                res.status(200).json({data: register});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.changeIsRead = async (req, res, next) =>{
    try {
        const {register_id} = req.body;
        const valid = await validateChangeIsRead(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const register = await registerService.changeIsRead(register_id);
            if(register==null){
                res.status(400).json({message: "Register id incorrect!"});
            }else{
                res.status(200).json({data: register});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.updateConfirmRegister = async (req, res, next) =>{
    try {
        const {register_id, service_id, registed} = req.body;
        const valid = await validateUpdateConfirmRegister(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const register = await registerService.updateConfirmRegister(register_id, service_id, registed);
            if(register==null){
                res.status(400).json({message: "Id incorrect"});
            }else{
                res.status(200).json({data: register});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteRegister = async (req, res, next) =>{
    try {
        const {register_id, service_id, user_id, date, term} = req.body;
        const valid = await validateDeleteRegister(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const register = await registerService.deleteRegister(register_id);
            if(register==null){
                res.status(400).json({message: "Id incorrect"});
            }else{
                const service = await service_Services.deleteRegisted(service_id, user_id, date, term);
                if(service==null){
                    res.status(400).json({message: "Id incorrect"});
                }else{
                    res.status(200).json({data: service});
                }
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}