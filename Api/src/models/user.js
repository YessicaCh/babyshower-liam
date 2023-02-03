const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName:{
         type: String,
         required: false,
     },
    giftName: {
        type: String,
        required: true
    },
    idGift: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('User',userSchema);