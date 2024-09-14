module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports.isInstructor = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'instructor') {
        return next();
    }
    res.redirect('/');
};

module.exports.isStudent = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'student') {
        return next();
    }
    res.redirect('/');
};
