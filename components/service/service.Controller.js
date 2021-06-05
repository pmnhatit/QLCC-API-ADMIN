const service_Services = require('./service.Service');
const {validateCreateService,validateDeleteService,
    validateUpdateService} = require('../../services/validation/validationService');

//GET
module.exports.getServices = async (req, res, next) =>{
    try {
        const services = await service_Services.getServices(req.query);
        res.status(200).json({data: services});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createService = async (req, res, next) =>{
    try {
        const valid = await validateCreateService(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const service = await service_Services.createService(req.body);
            res.status(200).json({data: service});  
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//UPDATE
// module.exports.updateRegisted = async (req, res, next) =>{
//     try {
//         const {service_id, registed} = req.body;
//         const service = await service_Services.updateRegisted(service_id, registed);
//         if(service==null){
//             res.status(400).json({message: "Parameter incorrect"});
//         }else{
//             res.status(200).json({data: service});
//         }
//     } catch (error) {
//         console.log("errors: ",error);
//         res.status(500).json(error);
//     }
// }
module.exports.updateService = async (req, res, next) =>{
    try {
        const valid = await validateUpdateService(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const service = await service_Services.updateService(req.body);
            if(service==null){
                res.status(400).json({message: "Parameter incorrect"});
            }else{
                res.status(200).json({data: service});
            }  
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteRegisted = async (req, res, next) =>{
    try {
        const {service_id, user_id, date, term} = req.body;
        const valid = await validateDeleteService(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const service = await service_Services.deleteRegisted(service_id, user_id, date, term);
            if(service==null){
                res.status(400).json({message: "Parameter incorrect"});
            }else{
                res.status(200).json({data: service});
            }  
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
