const mongoose = require('mongoose');

const riderequestSchema = new mongoose.Schema({
    request_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    pickuppoint:{
        type:String,
        required:true
    },

    destination:{
        type: String,
        required: true
    },

    journeydate:{
        type: String,
        required: true
    },

    time:{
        type:String,
        required:true
    },

    paidornot: {
        type: String,
        required: true
    },
    cost:{
        type: String,
        required:false


    }

}, {timestamps:true});

module.exports = mongoose.model('Riderequest', riderequestSchema);