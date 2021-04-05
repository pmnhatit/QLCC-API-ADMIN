const apartServices = require('./apartServices');
//GET
module.exports.getAllApartment = async (req, res, next) =>{
    try {
        console.log("đã vô")
        const apartments = await apartServices.getAllApartment();
        res.json({data: apartments});
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
//UPDATE
module.exports.updateApartment = async (req, res, next) =>{
    try {
        const {apart_id, name, block, area, direction, type, images, description} = req.body;
        const apartment = await apartServices.updateApartment(apart_id, name, block, area, direction, type, images, description);
        res.status(200).json({data: apartment});
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