const mongoose = require('mongoose');

const electricBillModel = require('./electricBill');
const allBillServices = require('../allBill/allBillServices');

//GET
module.exports.getElectricBillByApartmentId = async (id)=>{
    const result = await electricBillModel.find({'apart_id': id, 'is_delete': false});
    return result;
}
module.exports.getElectricBillByMonth = async (apart_id, month, year)=>{
    const result = await electricBillModel.findOne({'apart_id': apart_id, 'month': month, 'year': year, 'is_delete':false});
    return result;
}
module.exports.getElectricBillById = async (bill_id) =>{
    const result = await electricBillModel.findOne({'_id': bill_id, 'is_delete': false});
    return result;
}
module.exports.getAllBillByMonth = async (month, year) =>{
    const result = await electricBillModel.find({'month': month, 'year': year, 'is_delete': false});
    return result;
}
//CREATE
module.exports.importFile = async(data) =>{
    const result = await electricBillModel.insertMany(data);
    return result;
}
//UPDATE
module.exports.updateElectricBill = async (bill_id, apart_id, old_index, new_index, total_money, month, year) =>{
    const consume = new_index - old_index;
    const all_bill = await allBillServices.getBillOfApartByMonth(apart_id, month, year);
    if(all_bill){
        let total = all_bill.total_money - all_bill.electric_bill + total_money;
        const query = {
            bill_id: all_bill._id,
            total_money: total,
            electric_bill: total_money
        }
        await allBillServices.updateBillElement(query);
        mongoose.set('useFindAndModify', false);
        const result = await electricBillModel.findOneAndUpdate({'_id': bill_id},
        {'new_index': new_index, 'old_index': old_index, 'consume': consume, 'total_money': total_money},
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
    const result = await electricBillModel.findOneAndUpdate({'apart_id': apart_id, 'month': month, 'year': year, 'is_delete': false},
    {'is_pay': status},
    {new: true});
    return result;
}
//DELETE
module.exports.deleteElectricBill = async (bill_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await electricBillModel.findOneAndUpdate({'_id': bill_id},
    {'is_delete': true},
    {
        new: true
    });
    return result;
}
module.exports.deleteMany = async (month, year) =>{
    const result = await electricBillModel.deleteMany({'month': month, 'year': year});
    return result;
}