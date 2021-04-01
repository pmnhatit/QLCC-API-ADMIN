const unitPriceServices = require('./unitPriceServices');

module.exports.getUnitPrice = async (req, res, next) =>{
    try {
        const result = await unitPriceServices.getUnitPrice();
        res.json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.createUnitPrice = async (req, res, next) =>{
    try {
        const {electric, water, moto_fee, car_fee} = req.body;
        const newUnitPrice = await unitPriceServices.createUnitPrice(electric, water, moto_fee, car_fee);
        res.json({data: newUnitPrice});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.editUnitPrice = async (req, res, next) =>{
    try {
        const {electric, water} = req.body;
        await unitPriceServices.editUnitPrice(electric, water);
        const result = await unitPriceServices.getUnitPrice();
        res.json({data: result});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}