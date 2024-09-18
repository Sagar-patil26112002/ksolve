// middlewares/upload.js
const multer = require('multer');
const { videoStorage } = require('../cloudConfig');  // Ensure cloudConfig is in the same directory level

const uploadVideo = multer({ storage: videoStorage });

module.exports = uploadVideo;
