const electricBillServices = require('./electricBillServices');
//GET
module.exports.getBillByApartmentId = async (req, res, next) =>{
    try {
        const {apart_id} = req.params;
        console.log("apart_id: ", apart_id);
        const all_bill = await electricBillServices.getElectricBillByApartmentId(apart_id);
        res.json({data: all_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.getBillByMonth = async (req, res, next) =>{
    try {
        const {apart_id, month, year} = req.params;
        console.log("month: ",month);
        const month_bill = await electricBillServices.getElectricBillByMonth(apart_id, month, year);
        res.json({data: month_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.getAllBillsByMonth = async (req, res, next) =>{
    try {
        const {month, year} = req.params;
        const month_bills = await electricBillServices.getAllBillByMonth(month, year);
        res.status(200).json({data: month_bills});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
//CREATE
module.exports.createElectricBill = async (req, res, next) =>{
    try {
        const {apart_id, new_index, month, year} = req.body;
        const new_bill = await electricBillServices.createElectricBill(apart_id, new_index, month, year);
        res.json({data: new_bill});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}
//UPDATE
module.exports.updateElectricBill = async (req, res, next) =>{
    try {
        const {bill_id, new_index} = req.body;
        const new_bill = await electricBillServices.updateElectricBill(bill_id, new_index);
        res.status(200).json({data: new_bill});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deleteElectricBill = async (req, res, next) =>{
    try {
        const {bill_id} = req.params;
        const bill = await electricBillServices.deleteElectricBill(bill_id);
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