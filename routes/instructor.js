const express = require('express');
const router = express.Router();
const { isLoggedIn, isInstructor } = require('../middleware'); // Ensure only logged-in instructors can access this route
const instructorController = require('../controllers/instructor');

router.get('/instructorDashboard', isLoggedIn, isInstructor, instructorController.renderDashboard);

module.exports = router;
