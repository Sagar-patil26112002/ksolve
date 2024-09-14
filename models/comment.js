const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lecture: {
        type: Schema.Types.ObjectId,
        ref: 'Lecture',
        required: true
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
