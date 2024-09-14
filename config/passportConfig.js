const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const Instructor = require('../models/instructor');

// Configure Passport to use LocalStrategy for User
passport.use('student', new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) return done(null, false, { message: 'Incorrect username.' });
            const isMatch = await user.comparePassword(password);
            if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Configure Passport to use LocalStrategy for Instructor
passport.use('instructor', new LocalStrategy(
    async (username, password, done) => {
        try {
            const instructor = await Instructor.findOne({ username });
            if (!instructor) return done(null, false, { message: 'Incorrect username.' });
            const isMatch = await instructor.comparePassword(password);
            if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
            return done(null, instructor);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.findById(id);
        if (!user) user = await Instructor.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
