const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Storage for Images
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'TechHub/images',
      allowedFormats: ["png", "jpg", "jpeg"],
    },
});

// Storage for Videos
const videoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'TechHub/videos',
      allowedFormats: ["mp4", "mov", "avi"],
    },
});

// Storage for Books (PDFs)
const bookStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'TechHub/books',
      allowedFormats: ["pdf"],
    },
});

module.exports = {
    cloudinary,
    imageStorage,
    videoStorage,
    bookStorage
};
