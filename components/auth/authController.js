const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const bcrypt = require('bcryptjs');
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.KEY_SECRET;

const authServices = require('./authServices');
const {validateCreateAdmin, 
    validateUpdateAvatar, 
    validateUpdateInfo, 
    validateUpdateTokenDevice,
    validateChangePass,
    validateDelete,
    validateGetAdmin} = require('../../services/validation/validationAdmin');

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
        const infoUser = {_id: user.id, username: user.username, name: user.name, phone: user.phone, email: user.email, 
            avatar: user.avatar, role: user.role, token_device: user.token_device, 
            is_delete: user.is_delete, token_device_web: user.token_device_web};
        res.json({token: token, infoUser: infoUser});
    }
}
//CREATE
module.exports.createUser = async(req, res , next) => {
    try {
        const {username, password, name, phone, email, role} = req.body;
        const valid = await validateCreateAdmin(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const user = await authServices.getUserByUsername(username);
            console.log("user: ",user);
            if(user){
                res.status(401).json({message:"user_exists"});
            }else{
                const newUser = await authServices.createUser(username, password, name, phone, email, role);
                const payload = {username: newUser.username, id: newUser._id, role: newUser.role};
                const token = jwt.sign(payload, jwtOptions.secretOrKey);
                const infoUser = {_id: newUser._id, username: newUser.username, name: newUser.name, 
                    phone: newUser.phone, email: newUser.email, role: newUser.role, token_device: newUser.token_device, 
                    avatar: newUser.avatar, is_delete: newUser.is_delete, token_device_web: newUser.token_device_web};
                res.json({token: token, infoUser: infoUser});
            }
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
module.exports.getAdmin = async (req, res, next) =>{
    try {
        const valid = await validateGetAdmin(req.query);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const users = await authServices.getAdmin(req.query);
            res.status(200).json({data: users});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateInfo = async (req, res, next) =>{
    try {
        const {name, phone, email, user_id} = req.body;
        const valid = await validateUpdateInfo(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const user = await authServices.updateInfo(user_id, name, phone, email);
            if(user==null){
                res.status(400).json({message: "Id user incorrect!"});
            }else{
                const new_user = {_id: user._id, username: user.username, name: user.name, phone: user.phone, 
                    email: user.email, avatar: user.avatar, token_device: user.token_device, 
                    role: user.role, is_delete: user.is_delete, token_device_web: user.token_device_web};
                res.status(200).json({data: new_user});
            }
        }
    } catch (error) {
        console.log("error: ",error);
        res.status(500).json({error});
    }
}
module.exports.updateAvatar = async (req, res, next) =>{
    try {
        const {user_id, avatar} = req.body;
        const valid = await validateUpdateAvatar(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const user = await authServices.updateAvatar(user_id, avatar);
            if(user==null){
                res.status(400).json({message: "Id user incorrect!"});
            }else{
                res.status(200).json({data: user.avatar});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json({error});
    }
}
module.exports.updateTokenDeviceMobile = async (req, res, next) =>{
    try {
        const {user_id, token_device} = req.body;
        const valid = await validateUpdateTokenDevice(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const user = await authServices.updateTokenDeviceMobile(user_id, token_device);
            if(user==null){
                res.status(400).json({message: "Id user incorrect!"});
            }else{
                res.status(200).json({data: user.token_device});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.updateTokenDeviceWeb = async (req, res, next) =>{
    try {
        const {user_id, token_device} = req.body;
        const valid = await validateUpdateTokenDevice(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const user = await authServices.updateTokenDeviceWeb(user_id, token_device);
            if(user==null){
                res.status(400).json({message: "Id user incorrect!"});
            }else{
                res.status(200).json({data: user.token_device_web});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.changePassword = async (req, res, next) =>{
    try {
        const {user_id, new_pass, old_pass} = req.body;
        const valid = await validateChangePass(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            // const user = await authServices.getUserById(user_id);
            const check = await authServices.checkOldPassword(user_id, old_pass);
            if(check==false){
                res.status(400).json({message: "Current password is incorrect!"});
            }else{
                const new_user = await authServices.changePassword(user_id, new_pass);
                res.status(200).json();
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteUser = async (req, res, next) =>{
    try {
        const {user_id} = req.params;
        const valid = await validateDelete(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const user = await authServices.deleteUser(user_id);
            if(user){
                res.status(200).json();
            }else{
                res.status(400).json({message: "Cann't delete!"});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}