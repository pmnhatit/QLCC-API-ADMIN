const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var blockSchema = new mongoose.Schema({
    name: {
        type: String
    },
    is_delete: {
        type: Boolean,
        default: false
    }
},
    {
        collection: 'block'
    });

const block = db.useDb("qlcc").model("block", blockSchema);

module.exports = block;