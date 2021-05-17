const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var apartmentSchema = new mongoose.Schema({
    name: String,
    block: String,
    floor: {
        type: Number
    },
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
    owner: {//id chu can ho
        id:{
            type: String,
            default: ""
        },
        is_active:{
            type: Boolean,
            default: true
        }
    },
    description: {
        type: String, 
        default:""
    },
    is_delete: {
        type: Boolean,
        default: false
    },
},
    {
        collection: 'apartment'
    });

const apartment = db.useDb("qlcc").model("apartment", apartmentSchema);

module.exports = apartment;