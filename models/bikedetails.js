const mongoose = require('mongoose');
const bikedetailsSchema = new mongoose.Schema({
    post_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    model:{
        type:String,
        required:true
    },

    color:{
        type: String,
        required: true
    },

    plateno:{
        type: String,
        required: true
    },
   

    
}, {timestamps:true});
  

module.exports = mongoose.model('Bikedetails', bikedetailsSchema);