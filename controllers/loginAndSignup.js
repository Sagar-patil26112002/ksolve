const User = require('../models/user');
const Instructor = require('../models/instructor');
const bcrypt = require('bcrypt');
const passport = require("passport");

module.exports.renderSignup = (req, res) => {
    res.render("loginUser/register.ejs");
}

module.exports.registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        const existingInstructor = await Instructor.findOne({ $or: [{ username }, { email }] });

        if (existingUser || existingInstructor) {
            return res.status(400).send('Username or email already exists');
        }

        if (role === 'student') {
            const newUser = new User({ username, email, password });
            await newUser.save();
            res.redirect('/login');
        } else if (role === 'instructor') {
            const newInstructor = new Instructor({ username, email, password });
            await newInstructor.save();
            res.redirect('/login');
        } else {
            return res.status(400).send('Invalid role selected');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render("loginUser/login.ejs");
}

module.exports.loginSuccess = (req, res, next) => {
    const { role } = req.body;

    passport.authenticate(role, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).send(info.message);

        req.logIn(user, (err) => {
            if (err) return next(err);

            if (role === 'student') {
                res.locals.currUser = req.user;
                res.redirect('/student/studentDashboard');
            } else if (role === 'instructor') {
                res.redirect('/instructor/instructorDashboard');
            }
        });
    })(req, res, next);
};


module.exports.logoutSuccess = (req, res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.redirect('/'); // Redirect to home or error page
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.redirect('/'); // Redirect to listings page
        });
    })
};