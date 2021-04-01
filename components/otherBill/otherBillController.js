const otherBillServices = require('./otherBillServices');

module.exports.getBillByApartmentId = async (req, res, next)=>{
    try {
        const apart_id = req.params.apart_id;
        console.log("user_id: ", apart_id);
        const all_bill = await otherBillServices.getOtherBillByApartmentId(apart_id);
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
        const month_bill = await otherBillServices.getOtherBillByMonth(apart_id, month, year);
        res.json({data: month_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.createOtherBill = async (req, res, next) =>{
    try {
        const {apart_id, apart_management, n_motobikes, n_cars, maintenance_fee, 
            service_charge, other_fees, month, year, note} = req.body;
        const new_bill = await otherBillServices.createOtherBill(apart_id, apart_management, n_motobikes, n_cars, maintenance_fee, 
            service_charge, other_fees, month, year, note);
        res.json({data: new_bill});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}