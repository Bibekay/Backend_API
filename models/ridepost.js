const mongoose = require('mongoose');

const ridepostSchema = new mongoose.Schema({
    post_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    acepted_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:Boolean,
        default:false
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

   
    

module.exports = mongoose.model('Ridepost', ridepostSchema);