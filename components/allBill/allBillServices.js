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
module.exports.getAllBillReportResolved = async (month, year) =>{//Hoa don da giai quyet khieu nai
    const result = await allBillModel.find({'image': {$ne: ""}, 'month': month, 'year': year ,'is_delete': false, 'report': false});
    return result;
}
module.exports.getTotalMoneyInMonth = async (month, year) =>{
    let total=0, electric=0, water=0, other=0;
    const bills = await this.getAllByMonth(month, year);
    for(let i=0; i<bills.length; i++){
        if(bills[i].total_money){
            total = total + bills[i].total_money;
        }else{
            total = total + 0;
        }
        if(bills[i].electric_bill){
            electric = electric + bills[i].electric_bill;
        }else{
            electric = electric + 0;
        }
        if(bills[i].water_bill){
            water = water + bills[i].water_bill;
        }else{
            water = water + 0;
        }
        if(bills[i].other_bill){
            other = other + bills[i].other_bill;
        }else{
            other = other + 0;
        }
    }
    const result = {total: total, electric: electric, water: water, other: other};
    return result;
}
module.exports.getTotalUnpaidFee = async (month, year) =>{
    const bills = await this.getAllByIsPay(false, month, year);
    console.log("unpaid", bills);
    let total=0, electric=0, water=0, other=0;
    for(let i=0; i<bills.length; i++){
        if(bills[i].total_money){
            total = total + bills[i].total_money;
        }else{
            total = total + 0;
        }
        if(bills[i].electric_bill){
            electric = electric + bills[i].electric_bill;
        }else{
            electric = electric + 0;
        }
        if(bills[i].water_bill){
            water = water + bills[i].water_bill;
        }else{
            water = water + 0;
        }
        if(bills[i].other_bill){
            other = other + bills[i].other_bill;
        }else{
            other = other + 0;
        }
    }
    const result = {total: total, electric: electric, water: water, other: other};
    return result;
}
module.exports.getAllBill = async (data) =>{
    const {...query} = data;
    query.is_delete = false;
    const result = await allBillModel.find(query);
    return result;
}
//CREATE
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