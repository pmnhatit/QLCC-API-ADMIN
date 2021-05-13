const userServices = require('./userServices');
const apartServices = require('../apartment/apartServices');
const blockServices = require('../block/blockServices');
//GET
module.exports.getAllUser = async (req, res, next) =>{
    try {
        const users = await userServices.getAllUser();
        let data = [];
        for(let i=0; i<users.length; i++){
            let aparts = [], blocks = [];
            for(let j=0; j<users[i].apartment_id.length; j++){
                const apart = await apartServices.getApartmentById(users[i].apartment_id[j]);
                aparts.push(apart.name);
            }
            for(let k=0; k<users[i].block_id.length; k++){
                const block = await blockServices.getBlockById(users[i].block_id[k]);
                blocks.push(block.name);
            }
            const user = {
                id: users[i]._id,
                username: users[i].username,
                name: users[i].name,
                phone: users[i].phone,
                email: users[i].email,
                identify_card: users[i].identify_card,
                native_place: users[i].native_place,
                token_device: users[i].token_device,
                avatar: users[i].avatar,
                apart_id: users[i].apartment_id,
                apart_name: aparts,
                block_id: users[i].block_id,
                block_name: blocks,
                license_plates: users[i].license_plates,
                is_delete: users[i].is_delete
            }
            data.push(user);
        }
        res.status(200).json({data: data});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getUserById = async (req, res, next) =>{
    try {
        const {user_id} = req.params;
        const user = await userServices.getUserById(user_id);
        if(user){
            let aparts = [], blocks = [];
            for(let j=0; j<user.apartment_id.length; j++){
                const apart = await apartServices.getApartmentById(user.apartment_id[j]);
                aparts.push(apart.name);
            }
            for(let k=0; k<user.block_id.length; k++){
                const block = await blockServices.getBlockById(user.block_id[k]);
                blocks.push(block.name);
            }
            const data = {
                id: user._id,
                username: user.username,
                name: user.name,
                phone: user.phone,
                email: user.email,
                identify_card: user.identify_card,
                native_place: user.native_place,
                token_device: user.token_device,
                avatar: user.avatar,
                apart_id: user.apartment_id,
                apart_name: aparts,
                block_id: user.block_id,
                block_name: blocks,
                license_plates: user.license_plates,
                is_delete: user.is_delete
            }
            res.status(200).json({data: data});
        }else{
            res.status(400).json({message: "No user"});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getUserInactive = async (req, res, next) =>{//chua test
    try {
        const users = await userServices.getUserInactive();
        let result = [];
        for(let i=0; i<users.length; i++){
            const user = {id: users[i]._id, name: users[i].name, apart_id: users[i].apartment_id};
            result.push(user);
        }
        res.status(200).json({data: result});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getTokenDeviceByApartId = async (req, res, next) =>{
    try {
        const {apart_id} = req.params;
        const user = await userServices.getTokenDeviceByApartId(apart_id);
        if(user==null){
            res.status(400).json();
        }else{
            const token = user.token_device;
            res.status(200).json({token_device: token});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createUser = async (req, res, next) =>{
    try {
        const {username, name, phone, email, identify_card, 
            native_place, block_id, apartment_id, license_plates} = req.body;
        const user = await userServices.getUserByUsername(username);
        if(user){
            res.status(401).json({message:"user_exists"});
        }else{
            const new_user = await userServices.createUser(username, name, phone, email, identify_card, 
                native_place, block_id, apartment_id, license_plates);
                let aparts = [], blocks = [];
            for(let j=0; j<new_user.apartment_id.length; j++){
                const apart = await apartServices.getApartmentById(new_user.apartment_id[j]);
                aparts.push(apart.name);
            }
            for(let k=0; k<new_user.block_id.length; k++){
                const block = await blockServices.getBlockById(new_user.block_id[k]);
                blocks.push(block.name);
            }
            const data = {
                id: new_user._id,
                username: new_user.username,
                name: new_user.name,
                phone: new_user.phone,
                email: new_user.email,
                identify_card: new_user.identify_card,
                native_place: new_user.native_place,
                token_device: new_user.token_device,
                avatar: new_user.avatar,
                apart_id: new_user.apartment_id,
                apart_name: aparts,
                block_id: new_user.block_id,
                block_name: blocks,
                license_plates: new_user.license_plates,
                is_delete: new_user.is_delete
            }
            res.status(200).json({data: data});
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
        if(user){
            let aparts = [], blocks = [];
            for(let j=0; j<user.apartment_id.length; j++){
                const apart = await apartServices.getApartmentById(user.apartment_id[j]);
                aparts.push(apart.name);
            }
            for(let k=0; k<user.block_id.length; k++){
                const block = await blockServices.getBlockById(user.block_id[k]);
                blocks.push(block.name);
            }
            const data = {
                id: user._id,
                username: user.username,
                name: user.name,
                phone: user.phone,
                email: user.email,
                identify_card: user.identify_card,
                native_place: user.native_place,
                token_device: user.token_device,
                avatar: user.avatar,
                apart_id: user.apartment_id,
                apart_name: aparts,
                block_id: user.block_id,
                block_name: blocks,
                license_plates: user.license_plates,
                is_delete: user.is_delete
            }
            res.status(200).json({data: data});
        }else{
            res.status(400).json({message: "No user"});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.updateLicensePlates = async (req, res, next) =>{
    try {
        const {user_id, license_plates} = req.body;
        const user = await userServices.updateLicensePlates(user_id, license_plates);
        if(user){
            let aparts = [], blocks = [];
            for(let j=0; j<user.apartment_id.length; j++){
                const apart = await apartServices.getApartmentById(user.apartment_id[j]);
                aparts.push(apart.name);
            }
            for(let k=0; k<user.block_id.length; k++){
                const block = await blockServices.getBlockById(user.block_id[k]);
                blocks.push(block.name);
            }
            const data = {
                id: user._id,
                username: user.username,
                name: user.name,
                phone: user.phone,
                email: user.email,
                identify_card: user.identify_card,
                native_place: user.native_place,
                token_device: user.token_device,
                avatar: user.avatar,
                apart_id: user.apartment_id,
                apart_name: aparts,
                block_id: user.block_id,
                block_name: blocks,
                license_plates: user.license_plates,
                is_delete: user.is_delete
            }
            res.status(200).json({data: data});
        }else{
            res.status(400).json({message: "No user"});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.changeActiveStatus = async (req, res, next) =>{
    try {
        const {user_id, status} = req.body;
        if(user_id==undefined || status==undefined){
            res.status(400).json({message: "Missed parameters"})
        }else{
            const user = await userServices.changeActiveStatus(user_id, status);
            if(user==null){
                res.status(400).json({message: "User id incorrect"});
            }else{
                if(status==false){
                    for(let i=0; i<user.apartment_id.length; i++){
                        await apartServices.updateApartStatus(user.apartment_id[i], 4);
                    }
                }else{
                    for(let i=0; i<user.apartment_id.length; i++){
                        await apartServices.updateApartStatus(user.apartment_id[i], 3);
                    }
                }
                res.status(200).json({data: user});
            }
        }
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
//SEARCH
module.exports.searchByLicensePlate = async (req, res, next) =>{
    try {
        const {
            search
        } = req.query;
        const users = await userServices.searchByLicensePlate(search);
        if(users.length==0){
            res.status(400).json({message: "No user"});
        }else{
            let data = [];
            for(let i=0; i<users.length; i++){
                let aparts = [], blocks = [];
                for(let j=0; j<users[i].apartment_id.length; j++){
                    const apart = await apartServices.getApartmentById(users[i].apartment_id[j]);
                    aparts.push(apart.name);
                }
                for(let k=0; k<users[i].block_id.length; k++){
                    const block = await blockServices.getBlockById(users[i].block_id[k]);
                    blocks.push(block.name);
                }
                const user = {
                    id: users[i]._id,
                    username: users[i].username,
                    name: users[i].name,
                    phone: users[i].phone,
                    email: users[i].email,
                    identify_card: users[i].identify_card,
                    native_place: users[i].native_place,
                    token_device: users[i].token_device,
                    avatar: users[i].avatar,
                    apart_id: users[i].apartment_id,
                    apart_name: aparts,
                    block_id: users[i].block_id,
                    block_name: blocks,
                    license_plates: users[i].license_plates,
                    is_delete: users[i].is_delete
                }
                data.push(user);
            }
            res.status(200).json({data: data});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}