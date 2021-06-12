const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const editorialSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Editorial = mongoose.model('user', editorialSchema);
module.exports = Editorial;