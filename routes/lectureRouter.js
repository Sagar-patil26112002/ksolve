const express = require('express');
const router = express.Router();
const multer = require('multer');
const { videoStorage } = require('../cloudConfig');
const lectureController = require('../controllers/lecture.js');

// Set up multer with the Cloudinary video storage
const uploadVideo = multer({ storage: videoStorage });

// Route to display the form for creating a new lecture
router.get('/new', lectureController.renderCreateLectureForm);

// Route to handle form submission and video upload
router.post('/', uploadVideo.single('video'), lectureController.uploadSuccess);

// Route to display a specific lecture detail page
router.get('/:id', lectureController.renderLectureDetail);

module.exports = router;
