const unitPriceModel = require("./unitPrice");
//GET
module.exports.getUnitPrice = async ()=>{
    const result = await unitPriceModel.find();
    return result[0];
}
//CREATE
module.exports.createUnitPrice = async (electric, water, moto_fee, car_fee)=>{
    const newUnitPrice = new unitPriceModel({electric, water, moto_fee, car_fee});
    return await newUnitPrice.save();
}
//UPDATE
module.exports.editUnitPrice = async (electric, water) =>{
    const result = await unitPriceModel.updateOne({}, { $set: { 'electric': electric, 'water': water }}, (err, doc) => {
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    });
    console.log("hết service");
}