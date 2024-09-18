const Lecture = require('../models/lecture');

// Render the form to create a new lecture
module.exports.renderCreateLectureForm = (req, res) => {
    res.render('lectures/new'); // Assuming you have a 'new.ejs' view for creating lectures
};

// Handle video upload and lecture creation
module.exports.uploadSuccess = async (req, res) => {
    try {
        const { path, filename } = req.file; // The uploaded file's info (from Cloudinary)
        const lecture = new Lecture({
            videoUrl: path,
            videoFilename: filename,
            title: req.body.title,
            description: req.body.description
        });
        await lecture.save();
        console.log("success");
        req.flash('success', 'Lecture uploaded successfully!');
        res.redirect(`/lectures/${lecture._id}`); // Redirect to the newly created lecture detail page
    } catch (error) {
        req.flash('error', 'Failed to upload lecture');
        res.redirect('/lectures/new'); // Redirect back to the form if there’s an error
    }
};

// Render the lecture detail page
module.exports.renderLectureDetail = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.id); // Find the lecture by ID
        if (!lecture) {
            req.flash('error', 'Lecture not found');
            return res.redirect('/lectures'); // Redirect if the lecture doesn't exist
        }
        res.render('lectures/show', { lecture }); // Render the 'show.ejs' template and pass the lecture
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something went wrong');
        res.redirect('/lectures');
    }
};
