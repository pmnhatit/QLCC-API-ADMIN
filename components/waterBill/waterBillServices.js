const waterBillModel = require('./waterBill');
// const unitPriceServices = require('../unitPrice/unitPriceServices');
const cal = require('../../services/calculate/calculate');
//GET
module.exports.getWaterBillByApartmentId = async (id)=>{
    const result = await waterBillModel.find({'apart_id': id, 'is_delete': false});
    return result;
}
module.exports.getWaterBillByMonth = async (apart_id, month, year)=>{
    const result = await waterBillModel.findOne({'apart_id': apart_id, 'month': month, 'year': year, 'is_delete': false});
    return result;
}
module.exports.getWaterBillById = async (bill_id) =>{
    const result = await waterBillModel.findOne({'_id': bill_id, 'is_delete': false});
    return result;
}
module.exports.getAllBillsByMonth = async (month, year) =>{
    const result = await waterBillModel.find({'month': month, 'year': year, 'is_delete': false});
    return result;
}
//CREATE
module.exports.createWaterBill = async (apart_id, new_index, month, year) =>{
    const res = await cal.calculateWater(apart_id, new_index, month, year);
    const newBill = new waterBillModel({apart_id, old_index: res.old_index, new_index, unit_price: res.unit_price, 
        consume: res.consume, month, year, total_money: res.total_money});
    return await newBill.save();
}
module.exports.importFile = async(data) =>{
    const result = await waterBillModel.insertMany(data);
    return result;
}
//UPDATE
module.exports.updateWaterBill = async (bill_id, new_index) =>{
    const old_bill = await this.getWaterBillById(bill_id);
    const old_index = old_bill.old_index;
    const consume = new_index - old_index;
    const total_money = consume * old_bill.unit_price;
    const result = await waterBillModel.findOneAndUpdate({'_id': bill_id},
    {'new_index': new_index, 'consume': consume, 'total_money': total_money},
    {
        new: true
    });
    return result;
}
//DELETE
module.exports.deleteWaterBill = async (bill_id) =>{
    const result = await waterBillModel.findOneAndUpdate({'_id': bill_id},
    {'is_delete': true},
    {
        new: true
    });
    return result;
}