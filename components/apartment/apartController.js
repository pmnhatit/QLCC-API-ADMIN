const apartServices = require('./apartServices');
//GET
module.exports.getAllApartment = async (req, res, next) =>{
    try {
        const apartments = await apartServices.getAllApartment(req);
        res.status(200).json({data: apartments});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getApartmentById = async (req, res, next) =>{
    try {
        console.log("Vô id")
        const {id} = req.params;
        const apart_info = await apartServices.getApartmentById(id);
        res.json({data: apart_info});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getApartmentByIdUser = async (req, res, next) =>{
    try {
        console.log("vô đây")
        const {user_id} = req.params;
        const aparts_info = await apartServices.getApartmentsByIdUser(user_id);
        res.json({data: aparts_info}); 
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createApartment = async (req, res, next) =>{
    try {
        const {name, block, area, direction, type, images, description} = req.body;
        const new_apart = await apartServices.createApartment(name, block, area, direction, type, images, description);
        res.status(200).json({data: new_apart});
    } catch (error) {
        console.log("errors: ",error);
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
module.exports.getAllApartsInactive = async (req, res, next) =>{
    try {
        const aparts = await apartServices.getAllApartsInactive();
        res.status(200).json({data: aparts});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
// module.exports.getApartOwner = async (req, res, next) =>{
//     try {
//         const {apart_id} = req.params;
//         const apart = await apartServices.getApartOwner(apart_id);
//         res.status(200).json({data: apart});
//     } catch (error) {
//         console.log("errors: ",error);
//         res.status(500).json(error);
//     }
// }
//UPDATE
module.exports.updateApartment = async (req, res, next) =>{
    try {
        const apartment = await apartServices.updateApartment(req.body);
        if(apartment){
            res.status(200).json({data: apartment});
        }else{
            res.status(400).json({message: "Parameter incorrect"});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.changeApartStatus = async (req, res, next) =>{
    try {
        const {apart_id, status} = req.body;
        const apart = await apartServices.updateApartStatus(apart_id, status);
        res.status(200).json({data: apart});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.updateApartOwner = async (req, res, next) =>{
    try {
        const {apart_id, user_id} = req.body;
        const apart = await apartServices.updateApartOwner(apart_id, user_id);
        if(apart){
            res.status(200).json({data: apart});
        }else{
            res.status(400).json({message: "Parameter incorrect"});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.updateOwnerStatus = async (req, res, next) =>{
    try {
        const {apart_id, status} = req.body;
        const apart = await apartServices.updateOwnerStatus(apart_id, status);
        if(apart){
            res.status(200).json({data: apart});
        }else{
            res.status(400).json({message: "Parameter incorrect"});
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
        const apart = await apartServices.deleteApartment(apart_id);
        if(apart.is_delete==true){
            res.status(200).json();
        }else{
            res.status(500).json({message: "Cann't delete!"});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}