const mongoose = require('mongoose');

const giftSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status:{
        type: Boolean,
        required: true,
    },
    limit:{
        type: Number,
        required: true,
    },
    counter:{
        type: Number,
        default: 0
    },
    imgsrc: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Gift',giftSchema);