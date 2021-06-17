const mongoose = require('mongoose');

const otherBillModel = require('./otherBill');
const allBillServices = require('../allBill/allBillServices');

//GET
module.exports.getOtherBillByApartmentId = async (id)=>{
    const result = await otherBillModel.find({'apart_id': id});
    return result;
}
module.exports.getOtherBillByMonth = async (apart_id, month, year)=>{
    const result = await otherBillModel.findOne({'apart_id': apart_id, 'month': month, 'year': year});
    return result;
}
module.exports.getAllBillsByMonth = async (month, year) =>{
    const result = await otherBillModel.find({'month': month, 'year': year, 'is_delete': false});
    return result;
}
module.exports.getBillById = async (bill_id) =>{
    const result = await otherBillModel.findOne({'_id': bill_id, 'is_delete': false});
    return result;
}
//CREATE
module.exports.importFile = async(data) =>{
    const result = await otherBillModel.insertMany(data);
    return result;
}
//UPDATE
module.exports.updateOtherBill = async (bill_id, apart_id, apart_management, parking_fees, maintenance_fee, 
    service_charge, other_fees, month, year, note)=>{
    const total_money = apart_management + parking_fees + maintenance_fee + service_charge + other_fees;
    const all_bill = await allBillServices.getBillOfApartByMonth(apart_id, month, year);
    if(all_bill){
        let total = all_bill.total_money - all_bill.other_bill + total_money;
        const query = {
            bill_id: all_bill._id,
            total_money: total,
            other_bill: total_money
        }
        await allBillServices.updateBillElement(query);
        mongoose.set('useFindAndModify', false);
        const result = await otherBillModel.findOneAndUpdate({'_id': bill_id},
        {'apart_management': apart_management, 'maintenance_fee': maintenance_fee, 'total_money': total_money,
        'service_charge': service_charge, 'other_fees': other_fees, 'note': note, 'parking_fees': parking_fees},
        {
            new: true
        });
        return result;
    }else{
        return null;
    }
}
module.exports.changeIsPay = async (apart_id, month, year, status) =>{
    mongoose.set('useFindAndModify', false);
    const result = await otherBillModel.findOneAndUpdate({'apart_id': apart_id, 'month': month, 'year': year, 'is_delete': false},
    {'is_pay': status},
    {new: true});
    return result;
}
//DELETE
module.exports.deleteOtherBill = async (bill_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await otherBillModel.findOneAndUpdate({'_id': bill_id},
    {'is_delete': true},
    {
        new: true
    });
    return result;
}
module.exports.deleteMany = async (month, year) =>{
    const result = await otherBillModel.deleteMany({'month': month, 'year': year});
    return result;
}