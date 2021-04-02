const userServices = require('./userServices');
//GET
module.exports.getAllUser = async (req, res, next) =>{
    try {
        const users = await userServices.getAllUser();
        res.status(200).json({data: users});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getUserById = async (req, res, next) =>{
    try {
        const {user_id} = req.params;
        const user = await userServices.getUserById(user_id);
        res.json({data: user});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createUser = async (req, res, next) =>{
    try {
        const {username, password, name, phone, email, identify_card, native_place, block_id, apartment_id} = req.body;
        const user = await userServices.getUserByUsername(username);
        if(user){
            res.status(401).json({message:"user_exists"});
        }else{
            const new_user = await userServices.createUser(username, password, name, phone, email, identify_card, 
                native_place, block_id, apartment_id);
            res.status(200).json({data: new_user});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateApartOfUser = async (req, res, next) =>{
    try {
        const {user_id, apartment_id, block_id} = req.body;
        const user = await userServices.updateApartOfUser(user_id, block_id, apartment_id);
        res.status(200).json({data: user});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteUser = async (req, res, next) =>{
    try {
        const {user_id} = req.params;
        const user = await userServices.deleteUser(user_id);
        if(user.is_delete==true){
            res.status(200).json()
        }else{
            res.status(500).json({message: "Cann't delete!"});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}