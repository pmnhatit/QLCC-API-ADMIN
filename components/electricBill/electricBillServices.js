const electricBillModel = require('./electricBill');
const unitPriceServices = require('../unitPrice/unitPriceServices');
const cal = require('../../services/calculate/calculate');

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
module.exports.createElectricBill = async (apart_id, new_index, month, year) =>{
    const res = await cal.calculateElectric(apart_id, new_index, month, year);
    const newBill = new electricBillModel({apart_id, old_index: res.old_index, new_index, 
        unit_price: res.unit_price, consume: res.consume, month, year, total_money: res.total_money});
    return await newBill.save();
}
//UPDATE
module.exports.updateElectricBill = async (bill_id, new_index) =>{
    const old_bill = await this.getElectricBillById(bill_id);
    const old_index = old_bill.old_index;
    const consume = new_index - old_index;
    const unit_price = old_bill.unit_price;
    const result = await electricBillModel.findOneAndUpdate({'_id': bill_id},
    {'new_index': new_index, 'consume': consume, 'total_money': consume*unit_price},
    {
        new: true
    });
    return result;
}
//DELETE
module.exports.deleteElectricBill = async (bill_id) =>{
    const result = await electricBillModel.findOneAndUpdate({'_id': bill_id},
    {'is_delete': true},
    {
        new: true
    });
    return result;
}