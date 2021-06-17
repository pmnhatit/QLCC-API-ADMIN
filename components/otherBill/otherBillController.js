const csv = require("fast-csv");

const otherBillServices = require('./otherBillServices');
const allBillServices = require('../allBill/allBillServices');
const apartServices = require('../apartment/apartServices');
const {configs: configsS3, s3} = require('../../services/aws-s3/aws-config');

const {validateImportBill} = require('../../services/validation/validationOtherBill');
//GET
module.exports.getBillByApartmentId = async (req, res, next)=>{
    try {
        const apart_id = req.params.apart_id;
        console.log("user_id: ", apart_id);
        const all_bill = await otherBillServices.getOtherBillByApartmentId(apart_id);
        res.status(200).json({data: all_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getBillByMonth = async (req, res, next) =>{
    try {
        const {apart_id, month, year} = req.params;
        const month_bill = await otherBillServices.getOtherBillByMonth(apart_id, month, year);
        res.status(200).json({data: month_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getAllBillsByMonth = async (req, res, next) =>{
    try {
        const {month, year} = req.params;
        const bills = await otherBillServices.getAllBillsByMonth(month, year);
        res.status(200).json({data: bills});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
module.exports.getBillById = async (req, res, next) =>{
    try {
        const {bill_id} = req.params;
        const bill = await otherBillServices.getBillById(bill_id);
        res.status(200).json({data: bill});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//CREATE
// module.exports.createOtherBill = async (req, res, next) =>{
//     try {
//         const {apart_id, apart_management, n_motobikes, n_cars, maintenance_fee, 
//             service_charge, other_fees, month, year, note} = req.body;
//         const new_bill = await otherBillServices.createOtherBill(apart_id, apart_management, n_motobikes, n_cars, maintenance_fee, 
//             service_charge, other_fees, month, year, note);
//         allBillServices.updateOtherBill(new_bill.total_money, apart_id, month, year);
//         res.status(200).json({data: new_bill});
//     } catch (error) {
//         console.log("errors: ", error);
//         res.status(500).json(error);
//     }
// }
//UPDATE
module.exports.updateOtherBill = async (req, res, next) =>{
    try {
        const {bill_id, apart_id, apart_management, parking_fees, maintenance_fee, 
            service_charge, other_fees, month, year, note} = req.body;
        const bill = await otherBillServices.updateOtherBill(bill_id, apart_id, apart_management, parking_fees, 
            maintenance_fee, service_charge, other_fees, month, year, note);
        if(bill == null){
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            res.status(200).json({data: bill});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteOtherBill = async (req, res, next) =>{
    try {
        const {bill_id} = req.params;
        const bill = await otherBillServices.deleteOtherBill(bill_id);
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
                if(csvData[0][0]!="apart_name" || csvData[0][1]!="apart_management" || csvData[0][2]!="parking_fees" 
                || csvData[0][3]!="maintenance_fee" || csvData[0][4]!="service_charge" || csvData[0][5]!="other_fees"
                || csvData[0][6]!="total_money" || csvData[0][7]!="note"){
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
                            apart_management: parseInt(csvData[i][1]),
                            parking_fees: parseInt(csvData[i][2]),
                            maintenance_fee: parseInt(csvData[i][3]),
                            service_charge: parseInt(csvData[i][4]),
                            other_fees: parseInt(csvData[i][5]),
                            total_money: parseInt(csvData[i][6]),
                            note: csvData[i][7],
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
                    const bills = await otherBillServices.importFile(data);
                //cap nhat ben all bill
                for(let i=0; i<bills.length; i++){
                    await allBillServices.updateOtherBill(bills[i].total_money, bills[i].apart_id, month, year);
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