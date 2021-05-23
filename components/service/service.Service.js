const serviceModel = require('./service');
const mongoose = require('mongoose');
//GET
module.exports.getServices = async (data) =>{
    const {...query} = data;
    query.is_delete = false;
    // const newDate = new Date( 2021, 4, 31);
    // const timestamp = newDate.getTime();
    // console.log(timestamp);
    // var date = new Date(timestamp);

    // console.log("Date: "+date.getDate()+
    //     "/"+(date.getMonth()+1)+
    //     "/"+date.getFullYear()+
    //     " "+date.getHours()+
    //     ":"+date.getMinutes()+
    //     ":"+date.getSeconds());
    const result = await serviceModel.find(query,
        null,
        {
        sort: {name: 1}
    });
    return result;
}
// module.exports.test = async(date) =>{
//     const q = {};
//     const services = await this.getServices(q);
//     const found = services.find(service => service._id="60a86f13f30fc93d6c91cabf");
//     console.log("service", found);
//     let term = [];
//     for(let i=0; i<found.registed.length; i++){
//         if(found.registed[i].date==date){
//             term.push(found.registed[i].term);
//         }
//     }
//     return term;
// }
//CREATE
module.exports.createService = async (data) =>{
    const {...query} = data;
    const new_service = new serviceModel(query);
    return await new_service.save();
}
//UPDATE
module.exports.updateRegisted = async (service_id, registed) =>{
    mongoose.set('useFindAndModify', false);
    const result = await serviceModel.findOneAndUpdate({'_id': service_id, 'is_delete': false}, 
    {$addToSet: {registed: registed}}, 
    {
        new: true
    });
    return result;
}
module.exports.updateService = async (data) =>{
    mongoose.set('useFindAndModify', false);
    const {service_id, ...query} = data;
    const result = await serviceModel.findOneAndUpdate({'_id': service_id, 'is_delete': false}, 
    query, 
    {
        new: true
    });
    return result;
}