const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {  // This URL is from Cloudinary
        type: String,
        required: true
    },
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    }
});

module.exports = mongoose.model('Book', bookSchema);
