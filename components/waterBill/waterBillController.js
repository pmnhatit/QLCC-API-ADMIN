const waterBillServices = require('./waterBillServices');
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
//CREATE
module.exports.createElectricBill = async (req, res, next) =>{
    try {
        const {apart_id, new_index, month, year} = req.body;
        const new_bill = await waterBillServices.createWaterBill(apart_id, new_index, month, year);
        res.json({data: new_bill});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}
//UPDATE
module.exports.updateWaterBill = async (req, res, next) =>{
    try {
        const {bill_id, new_index} = req.body;
        const new_bill = await waterBillServices.updateWaterBill(bill_id, new_index);
        res.status(200).json({data: new_bill});
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