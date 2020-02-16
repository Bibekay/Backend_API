const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },
   
    contact:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    birthyear:{
        type:String,
        required:false
    },

    gender:{
        type:String,
        required: false
    },

    image:{
        type:String,
        required:false
    }

});

module.exports = mongoose.model('User', userSchema);