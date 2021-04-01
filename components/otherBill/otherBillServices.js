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
//CREATE
module.exports.createOtherBill = async (apart_id, apart_management, n_motobikes, n_cars, maintenance_fee, 
    service_charge, other_fees, month, year, note) =>{
    const unit_price = await unitPriceServices.getUnitPrice();
    const parking_fees = n_motobikes*unit_price.moto_fee + n_cars*unit_price.car_fee;
    const new_other_bill = new otherBillModel({apart_id, apart_management, parking_fees,
        maintenance_fee, service_charge, other_fees, month, year, note});
    return await new_other_bill.save();
}