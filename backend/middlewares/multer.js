import multer from "multer";
    
const storage = multer.diskStorage({
    // mục lưu file tạm (trước khi upload lên Cloudinary)
    destination: (req, file, cb) => {
        cb(null, "./public");
    },
    
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
// tạo middleware upload sử dụng cấu hình trên
export const upload = multer({ storage });

//1000 người nhắn tin cùng lúc thì giải quyết như nào (tính chịu lỗi)