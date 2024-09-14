const express = require('express');
const router = express.Router();
const multer = require('multer');
const { imageStorage, videoStorage, bookStorage } = require("../cloudConfig.js"); // Adjust import path

const upload = multer();

// Define your upload routes
router.post('/upload/book', upload.single('file'), (req, res) => {
    // Handle book upload
    res.send('Book uploaded');
});

router.post('/upload/lecture', upload.single('file'), (req, res) => {
    // Handle lecture upload
    res.send('Lecture uploaded');
});

module.exports = router;
