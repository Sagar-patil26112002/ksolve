const Instructor = require('../models/instructor');
const Class = require('../models/class'); // you have a Class model
const Session = require('../models/session'); // have a Session model

module.exports.renderDashboard = async (req, res) => {
    try {
        const instructor = await Instructor.findById(req.user._id);
        
        // Fetch all classes managed by this instructor
        const classes = await Class.find({ instructor: instructor._id });

        // Fetch upcoming sessions for these classes
        const upcomingSessions = await Session.find({ instructor: instructor._id }).sort('date');

        res.render('instructor/instructorDashboard', { instructor, classes, upcomingSessions });
    } catch (error) {
        console.error("Error loading instructor dashboard:", error);
        res.status(500).send("Internal Server Error");
    }
}
