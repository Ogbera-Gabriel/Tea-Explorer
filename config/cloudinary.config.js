// Cloud Service that gives the possibility to store Images

const cloudinary = require('cloudinary').v2;


// Package that creates a Folder to create Images in Cloudinary
const{CloudinaryStorage} = require('multer-storage-cloudinary')


// Handles Uploaded Files from Forms and translates them to image files that Cloudinary can read
const multer = require('multer')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
  });

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ['jpg', 'png'],
        folder: 'movie-project'
    }
})

module.exports = multer({storage})