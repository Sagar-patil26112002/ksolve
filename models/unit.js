const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

module.exports = mongoose.model('Unit', unitSchema);
