const unitPriceServices = require('../../components/unitPrice/unitPriceServices');
const electricServices = require('../../components/electricBill/electricBillServices');
const waterServices = require('../../components/waterBill/waterBillServices');

module.exports.calculateElectric = async (apart_id, new_index, month, year) =>{
    let m=0, y=0;
    if(month==1){
        m = 12;
        y = year - 1;
    }else{
        m = month - 1;
        y = year;
    }
    console.log("month: ",m);
    console.log("year: ",y);
    const preBil = await electricServices.getElectricBillByMonth(apart_id, m, y);
    const unitPrice = await unitPriceServices.getUnitPrice();
    let old_index;
    if(preBil==null){
        console.log("Vo if");
        old_index = 0;
    }else{
        console.log("Vo else");
        old_index = preBil.new_index;
    }
    console.log("old_index: ",old_index);
    const unit_price = unitPrice.electric;
    const consume = new_index - old_index;
    console.log("consume: ",consume);
    const total_money = consume * unit_price;
    console.log("Total: ", total_money);
    const res = {
        old_index: old_index,
        unit_price: unit_price,
        consume: consume,
        total_money: total_money
    }
    return res;
}
module.exports.calculateWater = async (apart_id, new_index, month, year) =>{
    let m=0, y=0;
    if(month==1){
        m = 12;
        y = year - 1;
    }else{
        m = month - 1;
        y = year;
    }
    console.log("month: ",m);
    console.log("year: ",y);
    const preBil = await waterServices.getWaterBillByMonth(apart_id, m, y);
    const unitPrice = await unitPriceServices.getUnitPrice();
    let old_index;
    if(preBil==null){
        console.log("Vo if");
        old_index = 0;
    }else{
        console.log("Vo else");
        old_index = preBil.new_index;
    }
    console.log("old_index: ",old_index);
    const unit_price = unitPrice.water;
    const consume = new_index - old_index;
    console.log("consume: ",consume);
    const total_money = consume * unit_price;
    console.log("Total: ", total_money);
    const res = {
        old_index: old_index,
        unit_price: unit_price,
        consume: consume,
        total_money: total_money
    }
    return res;
}