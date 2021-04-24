const mongoose = require('mongoose');

const allBillModel = require('./allBill');

//GET
module.exports.getAllByMonth = async (month, year) =>{//lay hoa don tat ca can ho trong thang
    const result = await allBillModel.find({'month': month, 'year': year, 'is_delete': false});
    return result;
}
module.exports.getBillById = async (id) =>{//lay hoa don theo id
    const result = await allBillModel.findOne({'_id': id, 'is_delete': false});
    return result;
}
module.exports.getAllByIsPay = async (is_pay, month, year) =>{
    const result = await allBillModel.find({'month': month, 'year': year, 'is_pay': is_pay, 'is_delete': false});
    return result;
}
module.exports.getAllByApartId = async (apart_id) =>{//lay tat ca hoa don cua can ho
    const result = await allBillModel.find({'apart_id': apart_id, 'is_delete': false});
    return result;
}
module.exports.getBillOfApartByMonth = async (apart_id, month, year) =>{//lay hoa don theo apart_id, month, year
    const result = await allBillModel.findOne({'apart_id': apart_id, 'month': month, 'year': year, 'is_delete': false});
    return result;
}
module.exports.getAllByReportStatus = async () =>{//lay tat ca hoa don co khieu nai
    const result = await allBillModel.find({'report': true, 'is_delete': false});
    return result;
}
module.exports.getAllBillReportResolved = async () =>{//Hoa don da giai quyet khieu nai
    const result = await allBillModel.find({'image': {$ne: ""}, 'is_delete': false, 'report': false});
    return result;
}
//CREATE
// module.exports.createBill = async (apart_id, electric_bill, water_bill, other_bill, month, year) =>{
//     const total_money = electric_bill + water_bill + other_bill;
//     const new_bill = new allBillModel({apart_id, electric_bill, water_bill, other_bill, total_money, month, year});
//     return await new_bill.save();
// }
//UPDATE
module.exports.changeIsPay = async (bill_id, status) =>{
    mongoose.set('useFindAndModify', false);
    const result = await allBillModel.findOneAndUpdate({'_id': bill_id},
    {'is_pay': status},
    {new: true});
    return result;
}
module.exports.updateImage = async (bill_id, image) =>{
    mongoose.set('useFindAndModify', false);
    const result = await allBillModel.findOneAndUpdate({'_id': bill_id},
    {'image': image},
    {new: true});
    return result;
}
module.exports.updateElectricBill = async (electric_bill, apart_id, month, year) =>{
    const bill = await this.getBillOfApartByMonth(apart_id, month, year);
    let total = 0;
    let image = [""];
    if(bill){
        total = bill.total_money + electric_bill;
        image = bill.image;
    }else{
        total = electric_bill;
    }
    const result = await allBillModel.updateOne({'apart_id': apart_id, 'month': month, 'year': year},
    {'electric_bill': electric_bill, 'total_money': total, 'report': false, 'is_delete': false, 
    'is_pay': false, 'image': image},
    {upsert: true});
}
module.exports.updateWaterBill = async (water_bill, apart_id, month, year) =>{
    const bill = await this.getBillOfApartByMonth(apart_id, month, year);
    let total = 0;
    let image = [""];
    if(bill){
        total = bill.total_money + water_bill;
        image = bill.image;
    }else{
        total = water_bill;
    }
    const result = await allBillModel.updateOne({'apart_id': apart_id, 'month': month, 'year': year},
    {'water_bill': water_bill, 'total_money': total, 'report': false, 'is_delete': false, 
    'is_pay': false, 'image': image},
    {upsert: true});
}
module.exports.updateOtherBill = async (other_bill, apart_id, month, year) =>{
    const bill = await this.getBillOfApartByMonth(apart_id, month, year);
    let total = 0;
    let image = [""];
    if(bill){
        total = bill.total_money + other_bill;
        image = bill.image;
    }else{
        total = other_bill;
    }
    const result = await allBillModel.updateOne({'apart_id': apart_id, 'month': month, 'year': year},
    {'other_bill': other_bill, 'total_money': total, 'report': false, 'is_delete': false, 
    'is_pay': false, 'image': image},
    {upsert: true});
}
module.exports.changeReportStatus = async (bill_id, status) =>{
    mongoose.set('useFindAndModify', false);
    const result = await allBillModel.findOneAndUpdate({'_id': bill_id},
    {'report': status},
    {new: true});
    return result;
}
//DELETE
module.exports.deleteBill = async (bill_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await allBillModel.findOneAndUpdate({'id': bill_id},
    {'is_delete': true},
    {new: true});
    return result;
}