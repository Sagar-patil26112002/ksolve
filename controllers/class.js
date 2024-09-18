const Instructor = require('../models/instructor');
const Class = require('../models/class'); // Declare once here
const Session = require('../models/session');

module.exports.renderCreate = (req, res) => {
    res.render('instructor/createClass');
}

module.exports.createSuccess = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newClass = new Class({
            title,
            description,
            instructor: req.user._id 
        });

        await newClass.save();
        req.flash('success', 'Class created successfully!');
        res.redirect('/instructor/instructorDashboard');
    } catch (error) {
        req.flash('error', 'Error creating class.');
        res.redirect('instructor/createClass');
    }
}

module.exports.showClass = async (req, res) => {
    const { id } = req.params;
    try {
        const classItem = await Class.findById(id)
            .populate('lectures')
            .populate('sessions');

        if (!classItem) {
            req.flash('error', 'Class not found');
            return res.redirect('/classes');
        }

        res.render('instructor/showClass', { classItem, lectures: classItem.lectures, sessions: classItem.sessions });
    } catch (err) {
        console.log(err);
        req.flash('error', 'Something went wrong');
        res.redirect('/classes');
    }
};
