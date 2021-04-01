const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var apartmentSchema = new mongoose.Schema({
    name: String,
    block: String,
    area: Number,
    direction: {
        type: String//Huong nha
    },
    type: {
        type: String//vd: 1PN, 2PN, Loai A, B, PENTHOUSE
    },
    images: [{
        type: String,
        default: ""
    }],
    status: {
        type: Number,
        default: 1
    },//1: con trong | 2: da thue | 3: da ban
    is_delete: {
        type: Boolean,
        default: false
    },
    description: {
        type: String, 
        default:""
    }
},
    {
        collection: 'apartment'
    });

const apartment = db.useDb("qlcc").model("apartment", apartmentSchema);

module.exports = apartment;