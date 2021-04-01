const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.KEY_SECRET;

const authServices = require('./authServices');

module.exports.login = async (req, res, next) =>{
    const user = req.user;
    console.log("user: ",user);
    if(user.message==="null"){
        res.status(401).json();
    }else{
        console.log("vô else")
        // Generate jwt token for user, you can also add more data to sign, such as: role, birthday...
        const sign = {username: user.username, id: user.id, role: user.role}
        const token = jwt.sign(sign, process.env.KEY_SECRET);
        console.log(token);
        const infoUser = {id: user.id, username: user.username, name: user.name, phone: user.phone, email: user.email, 
            avatar: user.avatar, role: user.role, token_device: user.token_device, is_delete: user.is_delete};
        res.json({token: token, infoUser: infoUser});
    }
}
//CREATE
module.exports.createUser = async(req, res , next) => {
    try {
        const {username, password, name, phone, email} = req.body;
        const user = await authServices.getUserByUsername(username);
        console.log("user: ",user);
        if(user){
            res.status(401).json({message:"user_exists"});
        }else{
            console.log("Vo else")
            const newUser = await authServices.createUser(username, password, name, phone, email);
            const payload = {username: newUser.username, id: newUser._id, role: newUser.role};
            const token = jwt.sign(payload, jwtOptions.secretOrKey);
            const infoUser = {id: newUser._id, username: newUser.username, name: newUser.name, 
                phone: newUser.phone, email: newUser.email, role: newUser.role, token_device: newUser.token_device, 
                avatar: newUser.avatar, is_delete: newUser.is_delete};
            res.json({token: token, infoUser: infoUser});
        }
    } catch (error) {
        res.status(500).json({error:error});
    }
}
//GET
module.exports.getAllUser = async (req, res, next) =>{
    try {
        const users = await authServices.getAllUser();
        res.status(200).json({data: users});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateInfo = async (req, res, next) =>{
    try {
        const {name, phone, email, user_id} = req.body;
        const user = await authServices.updateInfo(user_id, name, phone, email);
        res.status(200).json({data: user});
    } catch (error) {
        console.log("error: ",error);
        res.status(500).json({error});
    }
}
module.exports.updateAvatar = async (req, res, next) =>{
    try {
        const {user_id, avatar} = req.body;
        await authServices.updateAvatar(user_id, avatar);
        const new_auth = await authServices.getUserById(user_id);
        res.status(200).json({data: new_auth.avatar});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json({error});
    }
}
module.exports.updateTokenDevice = async (req, res, next) =>{
    try {
        const {user_id, token_device} = req.body;
        await authServices.updateTokenDevice(user_id, token_device);
        const new_auth = await authServices.getUserById(user_id);
        res.status(200).json({data: new_auth.token_device});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.changePassword = async (req, res, next) =>{
    try {
        const {user_id, new_pass} = req.body;
        const user = await authServices.changePassword(user_id, new_pass);
        res.status(200).json({data: user});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteUser = async (req, res, next) =>{
    try {
        const {user_id} = req.params;
        const user = await authServices.deleteUser(user_id);
        if(user.is_delete==true){
            res.status(200).json()
        }else{
            res.status(500).json({message: "Cann't delete!"});
        }
        
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}