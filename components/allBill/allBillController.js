const allBillServices = require('./allBillServices');
const apartServices = require('../apartment/apartServices');
const elctricBillServices = require('../electricBill/electricBillServices');
const waterBillServices = require('../waterBill/waterBillServices');
const otherBillServices = require('../otherBill/otherBillServices');

//GET
module.exports.getAllBillMonth = async (req, res, next) =>{//lay hoa don tat ca can ho trong thang
    try {
        const {month, year} = req.params;
        const bills = await allBillServices.getAllByMonth(month, year);
        let data = [];
        for(let i=0; i<bills.length; i++){
            const apart = await apartServices.getApartmentById(bills[i].apart_id);
            const bill = {
                id: bills[i]._id,
                apart_id: bills[i].apart_id,
                apart_name: apart.name,
                electric_bill: bills[i].electric_bill,
                water_bill: bills[i].water_bill,
                other_bill: bills[i].other_bill,
                image: bills[i].image,
                month: bills[i].month,
                year: bills[i].year,
                total_money: bills[i].total_money,
                is_pay: bills[i].is_pay,
                is_delete: bills[i].is_delete
            }
            data.push(bill);
        }
        res.status(200).json({data: data});
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
        const result = {id: bill._id, apart_id: bill.apart_id, apart_name: apart.name, electric_bill: bill.electric_bill,
            water_bill: bill.water_bill, other_bill: bill.other_bill, total_money: bill.total_money, image: bill.image,
            month: bill.month, year: bill.year, is_pay: bill.is_pay, is_delete: bill.is_delete};
        res.status(200).json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getAllByIsPay = async (req, res, next) =>{
    try {
        const {is_pay, month, year} = req.query;
        const bills = await allBillServices.getAllByIsPay(is_pay, month, year);
        let data = [];
        for(let i=0; i<bills.length; i++){
            const apart = await apartServices.getApartmentById(bills[i].apart_id);
            const bill = {
                id: bills[i]._id,
                apart_id: bills[i].apart_id,
                apart_name: apart.name,
                electric_bill: bills[i].electric_bill,
                water_bill: bills[i].water_bill,
                other_bill: bills[i].other_bill,
                image: bills[i].image,
                month: bills[i].month,
                year: bills[i].year,
                total_money: bills[i].total_money,
                is_pay: bills[i].is_pay,
                is_delete: bills[i].is_delete
            }
            data.push(bill);
        }
        res.status(200).json({data: data});
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
        console.log(bill);
        if(bill){
            await elctricBillServices.changeIsPay(bill.apart_id, bill.month, bill.year, status);
            await waterBillServices.changeIsPay(bill.apart_id, bill.month, bill.year, status);
            await otherBillServices.changeIsPay(bill.apart_id, bill.month, bill.year, status);
            const apart = await apartServices.getApartmentById(bill.apart_id);
        const result = {id: bill._id, apart_id: bill.apart_id, apart_name: apart.name, electric_bill: bill.electric_bill,
            water_bill: bill.water_bill, other_bill: bill.other_bill, total_money: bill.total_money, image: bill.image,
            month: bill.month, year: bill.year, is_pay: bill.is_pay, is_delete: bill.is_delete};
        res.status(200).json({data: result});
        }
        
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}