import { v2 as cloudinary } from 'cloudinary'; //Thư viện couldinary để upload ảnh
import fs from 'fs'; // Thư viện Node.js để thao tác với file hệ thống

const uploadOnCloudinary = async (filePath) => {
    //cấu hình cloudinary
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });

try {
    const uploadResult = await cloudinary.uploader.upload(filePath)
    fs.unlinkSync(filePath); //xóa file tạm trên server sau khi up được ảnh
    return uploadResult.secure_url; 

} catch (error) {
    fs.unlinkSync(filePath); 
    console.error("Cloudinary upload error:", error);
}
}

export default uploadOnCloudinary;