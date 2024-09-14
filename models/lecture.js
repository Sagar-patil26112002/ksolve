const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lectureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    videoUrl: {  // This URL is from Cloudinary
        type: String
    },
    session: {
        type: Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model('Lecture', lectureSchema);
