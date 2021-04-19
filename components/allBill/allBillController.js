const allBillServices = require('./allBillServices');
const apartServices = require('../apartment/apartServices');

//GET
module.exports.getAllBillMonth = async (req, res, next) =>{//lay hoa don tat ca can ho trong thang
    try {
        const {month, year} = req.params;
        const bills = await allBillServices.getAllByMonth(month, year);
        res.status(200).json({data: bills});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getBillById = async (req, res, next) =>{
    try {
        const {bill_id} = req.params;
        const bill = await allBillServices.getBillById(bill_id);
        const apart = await apartServices.getApartmentById(bill.apart_id);
        const result = {apart_id: bill.apart_id, apart_name: apart.name, electric_bill: bill.electric_bill,
            water_bill: bill.water_bill, other_bill: bill.other_bill, total_money: bill.total_money, image: bill.image,
            month: bill.month, year: bill.year, is_pay: bill.is_pay, is_delete: bill.is_delete};
        res.status(200).json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getAllByApartId = async (req, res, next) =>{//lay tat ca hoa don cua can ho
    try {
        const {apart_id} = req.params;
        const bills = await allBillServices.getAllByApartId(apart_id);
        res.status(200).json({data: bills});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getBillOfApartByMonth = async (req, res, next) =>{//lay hoa don theo apart_id, month, year
    try {
        const {apart_id, month, year} = req.params;
        const bill = await allBillServices.getBillOfApartByMonth(apart_id, month, year);
        res.status(200).json({data: bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//CREATE
module.exports.createBill = async (req, res, next) =>{
    try {
        const {apart_id, electric_bill, water_bill, other_bill, month, year} = req.body;
        const bill = await allBillServices.createBill(apart_id, electric_bill, water_bill, other_bill, month, year);
        const apart = await apartServices.getApartmentById(apart_id);
        const result = {id: bill._id, apart_id: bill.apart_id, apart_name: apart.name, electric_bill: bill.electric_bill,
            water_bill: bill.water_bill, other_bill: bill.other_bill, total_money: bill.total_money, image: bill.image,
            month: bill.month, year: bill.year, is_pay: bill.is_pay, is_delete: bill.is_delete};
        res.status(200).json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.changeIsPay = async (req, res, next) =>{
    try {
        const {bill_id, status} = req.body;
        const bill = await allBillServices.changeIsPay(bill_id, status);
        res.status(200).json({data: bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}