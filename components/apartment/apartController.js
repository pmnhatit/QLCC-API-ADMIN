const apartServices = require('./apartServices');
const {validateGetAllApartment,
    validateCreateApartment,
    validateApartId,
    validateUpdateApartment} = require('../../services/validation/validationApartment');
//GET
module.exports.getAllApartment = async (req, res, next) =>{
    try {
        const valid = await validateGetAllApartment(req.query);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            const apartments = await apartServices.getAllApartment(req.query);
            res.status(200).json({data: apartments});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getApartmentById = async (req, res, next) =>{
    try {
        const {apart_id} = req.params;
        const valid = await validateApartId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            const apart_info = await apartServices.getApartmentById(apart_id);
            res.json({data: apart_info});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getApartmentByIdUser = async (req, res, next) =>{
    try {
        const {user_id} = req.params;
        const aparts_info = await apartServices.getApartmentsByIdUser(user_id);
        res.json({data: aparts_info}); 
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getAllApartsEmpty = async (req, res, next) =>{
    try {
        const aparts = await apartServices.getAllApartsEmpty();
        res.status(200).json({data: aparts});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createApartment = async (req, res, next) =>{
    try {
        const {name, block, floor, area, direction, type, images, description} = req.body;
        const valid = await validateCreateApartment(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            const new_apart = await apartServices.createApartment(name, block, floor, area, direction, type, images, description);
            res.status(200).json({data: new_apart});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateApartment = async (req, res, next) =>{
    try {
        const valid = await validateUpdateApartment(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            const apartment = await apartServices.updateApartment(req.body);
            if(apartment){
                res.status(200).json({data: apartment});
            }else{
                res.status(400).json({message: "Parameter incorrect"});
            }
        }
        
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteApartment = async (req, res, next) =>{
    try {
        const {apart_id} = req.params;
        const valid = await validateApartId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            const apart = await apartServices.deleteApartment(apart_id);
            if(apart){
                res.status(200).json();
            }else{
                res.status(500).json({message: "Cann't delete!"});
            }
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}