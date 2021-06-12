const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Book = mongoose.model('book', bookSchema);
module.exports = Book;