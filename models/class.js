const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    lectures: [{  // Define lectures as an array of ObjectId, referencing the Lecture model
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
    }],
    sessions: [{
        type: Schema.Types.ObjectId,
        ref: 'Session'
    }]
});

module.exports = mongoose.model('Class', classSchema);
