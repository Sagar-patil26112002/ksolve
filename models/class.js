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
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    units: [{
        type: Schema.Types.ObjectId,
        ref: 'Unit'
    }],
    sessions: [{
        type: Schema.Types.ObjectId,
        ref: 'Session'
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Class', classSchema);
