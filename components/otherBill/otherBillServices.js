const mongoose = require('mongoose');

const otherBillModel = require('./otherBill');
const unitPriceServices = require('../unitPrice/unitPriceServices');
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
//CREATE
module.exports.createOtherBill = async (apart_id, apart_management, n_motobikes, n_cars, maintenance_fee, 
    service_charge, other_fees, month, year, note) =>{
    const unit_price = await unitPriceServices.getUnitPrice();
    const parking_fees = n_motobikes*unit_price.moto_fee + n_cars*unit_price.car_fee;
    const total_money = apart_management + parking_fees + maintenance_fee + service_charge + other_fees;
    const new_other_bill = new otherBillModel({apart_id, apart_management, parking_fees,
        maintenance_fee, service_charge, other_fees, total_money, month, year, note});
    return await new_other_bill.save();
}
module.exports.importFile = async(data) =>{
    const result = await otherBillModel.insertMany(data);
    return result;
}
//UPDATE
module.exports.updateOtherBill = async (bill_id, apart_id, apart_management, n_motobikes, n_cars, maintenance_fee, 
    service_charge, other_fees, month, year, note)=>{
    mongoose.set('useFindAndModify', false);
    const unit_price = await unitPriceServices.getUnitPrice();
    const parking_fees = n_motobikes*unit_price.moto_fee + n_cars*unit_price.car_fee;
    const result = await otherBillModel.findOneAndUpdate({'_id': bill_id, 'is_delete': false},
    {'apart_id': apart_id, 'apart_management': apart_management, 'maintenance_fee': maintenance_fee, 
    'service_charge': service_charge, 'other_fees': other_fees, 'month': month, 'year': year, 'note': note, 
    'parking_fees': parking_fees},
    {
        new: true
    });
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