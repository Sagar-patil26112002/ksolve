const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
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
    lectures: [{
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
    }]
});

module.exports = mongoose.model('Session', sessionSchema);
