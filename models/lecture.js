const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lectureSchema = new Schema({
    title: {
        type: String,
        required: true, // Title is required
        trim: true // This will remove any leading or trailing spaces
    },
    content: {
        type: String, // Lecture content (e.g., description or textual content)
        trim: true // Optionally trim any spaces
    },
    videoUrl: {
        type: String, // URL of the uploaded video (from Cloudinary)
        required: true // It's important to make this required since the lecture depends on the video
    },
    session: {
        type: Schema.Types.ObjectId, // Reference to the Session model
        ref: 'Session',
        required: true // Ensure that every lecture is associated with a session
    },
    comments: [{
        type: Schema.Types.ObjectId, // Reference to the Comment model
        ref: 'Comment'
    }],
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the created date when a lecture is created
    }
});

module.exports = mongoose.model('Lecture', lectureSchema);
