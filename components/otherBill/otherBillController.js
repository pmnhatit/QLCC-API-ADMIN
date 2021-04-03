const otherBillServices = require('./otherBillServices');
//GET
module.exports.getBillByApartmentId = async (req, res, next)=>{
    try {
        const apart_id = req.params.apart_id;
        console.log("user_id: ", apart_id);
        const all_bill = await otherBillServices.getOtherBillByApartmentId(apart_id);
        res.json({data: all_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getBillByMonth = async (req, res, next) =>{
    try {
        const {apart_id, month, year} = req.params;
        console.log("month: ",month);
        const month_bill = await otherBillServices.getOtherBillByMonth(apart_id, month, year);
        res.json({data: month_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createOtherBill = async (req, res, next) =>{
    try {
        const {apart_id, apart_management, n_motobikes, n_cars, maintenance_fee, 
            service_charge, other_fees, month, year, note} = req.body;
        const new_bill = await otherBillServices.createOtherBill(apart_id, apart_management, n_motobikes, n_cars, maintenance_fee, 
            service_charge, other_fees, month, year, note);
        res.json({data: new_bill});
    } catch (error) {
        console.log("errors: ", error);
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
//UPDATE
module.exports.updateOtherBill = async (req, res, next) =>{
    try {
        const {bill_id, apart_id, apart_management, n_motobikes, n_cars, maintenance_fee, 
            service_charge, other_fees, month, year, note} = req.body;
        const bill = await otherBillServices.updateOtherBill(bill_id, apart_id, apart_management, n_motobikes, n_cars, 
            maintenance_fee, service_charge, other_fees, month, year, note);
        res.status(200).json({data: bill});
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