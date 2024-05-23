import { v2 as cloudinary } from 'cloudinary';

const uploadOnCloudinary = async (file) => {
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url("shoes", {
        fetch_format: 'auto',
        quality: 'auto'
    });

    console.log(optimizeUrl);

};