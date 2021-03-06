const csv = require("fast-csv");

const waterBillServices = require('./waterBillServices');
const allBillServices = require('../allBill/allBillServices');
const apartServices = require('../apartment/apartServices');
const {configs: configsS3, s3} = require('../../services/aws-s3/aws-config');
const {validateImportBill} = require('../../services/validation/validationWaterBill');
//GET
module.exports.getBillByApartmentId = async (req, res, next) =>{
    try {
        const apart_id = req.params.apart_id;
        const all_bill = await waterBillServices.getWaterBillByApartmentId(apart_id);
        res.json({data: all_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.getBillByMonth = async (req, res, next) =>{
    try {
        const {apart_id, month, year} = req.params;
        const month_bill = await waterBillServices.getWaterBillByMonth(apart_id, month, year);
        res.json({data: month_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.getAllBillsByMonth = async (req, res, next) =>{
    try {
        const {month, year} = req.params;
        const month_bills = await waterBillServices.getAllBillsByMonth(month, year);
        res.status(200).json({data: month_bills});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.getBillById = async (req, res, next) =>{
    try {
        const {bill_id} = req.params;
        const bill = await waterBillServices.getWaterBillById(bill_id);
        res.status(200).json({data: bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
//CREATE
// module.exports.createElectricBill = async (req, res, next) =>{
//     try {
//         const {apart_id, new_index, month, year} = req.body;
//         const new_bill = await waterBillServices.createWaterBill(apart_id, new_index, month, year);
//         allBillServices.updateWaterBill(new_bill.total_money, apart_id, month, year);
//         res.json({data: new_bill});
//     } catch (error) {
//         console.log("errors: ", error);
//         res.status(500);
//     }
// }
//UPDATE
module.exports.updateWaterBill = async (req, res, next) =>{
    try {
        const {bill_id, apart_id, old_index, new_index, total_money, month, year} = req.body;
        const new_bill = await waterBillServices.updateWaterBill(bill_id, apart_id, old_index, new_index, total_money, month, year);
        if(new_bill==null){
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            res.status(200).json({data: new_bill});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteWaterBill = async (req, res, next) =>{
    try {
        const {bill_id} = req.params;
        const bill = await waterBillServices.deleteWaterBill(bill_id);
        if(bill.is_delete==true){
            res.status(200).json();
        }else{
            res.status(500).json({message: "Cann't delete"});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//READ CSV
module.exports.importCSV = async (req, res, next) =>{
    try {
        const {
            key, month, year
        } = req.body;
        const valid = await validateImportBill(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const params = {
                Bucket: configsS3.bucketNameCSV,
                Key: key,
                // Expires: 3600, //s - 1 hour
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
                if(csvData[0][0]!="apart_name" || csvData[0][1]!="old_index" || csvData[0][2]!="new_index" || csvData[0][3]!="total_money"){
                    res.status(400).json({message: "Incorrect file format "});
                }
                let data = [], wrong_name = [];
                const q = {};
                const aparts = await apartServices.getAllApartment(q);
                for(let i=1; i<csvData.length; i++){
                    const found = aparts.find(apart => apart.name===csvData[i][0]);
                    if(found){
                        const record = {
                            apart_id: found._id,
                            old_index: parseInt(csvData[i][1]),
                            new_index: parseInt(csvData[i][2]),
                            total_money: parseInt(csvData[i][3]),
                            consume: parseInt(csvData[i][2]) - parseInt(csvData[i][1]),
                            month: month,
                            year: year
                        };
                        data.push(record);
                    }else{
                        wrong_name.push(csvData[i][0]);
                    }
                }
                if(data.length < csvData.length - 1){
                    res.status(400).json({message: "Incorrect apartment name", names: wrong_name});
                }else{
                    const bills = await waterBillServices.importFile(data);
                //cap nhat ben all bill
                for(let i=0; i<bills.length; i++){
                    await allBillServices.updateWaterBill(bills[i].total_money, bills[i].apart_id, month, year);
                }
                res.status(200).json({data: bills});
                }
            });
            // }
        }
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}