const apartServices = require('./apartServices');
const {validateGetAllApartment,
    validateCreateApartment,
    validateApartId,
    validateUpdateApartment,
    validateUpdateOwner} = require('../../services/validation/validationApartment');

const csv = require("fast-csv");
const {configs: configsS3, s3} = require('../../services/aws-s3/aws-config');
const blockServices = require('../block/blockServices');
//GET
module.exports.getAllApartment = async (req, res, next) =>{
    try {
        // const valid = await validateGetAllApartment(req.query);
        // if(valid.error){
        //     console.log(valid.error);
        //     res.status(400).json({message: "Parameter incorrect"});
        // }else{
            const apartments = await apartServices.getAllApartment(req.query);
            res.status(200).json({data: apartments});
        // }
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
module.exports.updateOwner = async(req, res, next) =>{
    try {
        const {apart_id, user_id, is_active, status} = req.body;
        const valid = await validateUpdateOwner(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const apart = await apartServices.updateOwner(apart_id, user_id, is_active, status);
            if(apart){
                res.status(200).json({data: apart});
            }else{
                res.status(400).json({message: "Apartment id incorrect!"});
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
//import
module.exports.importCSV = async (req, res, next) =>{
    try {
        const {
            key
        } = req.body;
        // const valid = await validateImportBill(req.body);
        // if(valid.error){
        //     console.log(valid.error);
        //     res.status(400).json({message: "Parameter incorrect!"});
        // }else{
            const params = {
                Bucket: configsS3.bucketNameCSV,
                Key: key,
            };
            // const bills_month = await electricBillServices.getAllBillByMonth(month, year);
            // console.log("bill month", bills_month);
            // if(bills_month.length!=0){
            //     res.status(400).json({message: "Bill for this month already exists"});
            // }else{
            let csvData = [];
            const s3Stream = s3.getObject(params).createReadStream();
            csv.parseStream(s3Stream)
                .on("error", (error) => {
                    res.status(400).json({message: error});
                })
                .on('data', (row) => {
                    csvData.push(row);
                })
            .on("end", async () => {
                if(csvData[0][0]!="name" || csvData[0][1]!="block" || csvData[0][2]!="floor" || csvData[0][3]!="area" || csvData[0][4]!="direction" || csvData[0][5]!="type" || csvData[0][6]!="description"){
                    res.status(400).json({message: "Incorrect file format "});
                }
                let data = [], wrong_name = [];
                const q = {};
                const blocks = await blockServices.getAllBlocks();
                for(let i=1; i<csvData.length; i++){
                    const found = blocks.find(block => block.name===csvData[i][1]);
                    console.log(found);
                    if(found){
                        let images = [];
                        for(let j=7; j<csvData[i].length; j++){
                            const image = csvData[i][j];
                            images.push(image);
                        }
                        const record = {
                            block: found._id,
                            name: csvData[i][0],
                            floor: parseInt(csvData[i][2]),
                            area: parseInt(csvData[i][3]),
                            direction: csvData[i][4],
                            type: csvData[i][5],
                            description: csvData[i][6],
                            images: images
                        };
                        data.push(record);
                    }else{
                        wrong_name.push(csvData[i][0]);
                    }
                    
                }
                console.log("wrong name", wrong_name);
                if(data.length < csvData.length - 1){
                    res.status(400).json({message: "Incorrect apartment name", names: wrong_name});
                }else{
                    const aparts = await apartServices.importFile(data);
                    res.status(200).json({data: aparts});
                }
            });
            // }
        // }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}