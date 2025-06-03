const express = require('express');
const { editProfile, getCurrentUser, getOtherUsers, search } = require('../controllers/user.controller');
const isAuth = require('../middlewares/isAuth');
const { upload } = require('../middlewares/multer');

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser); // lấy infor user hiện tại
userRouter.get("/others", isAuth, getOtherUsers);  // lấy list user khác
userRouter.put("/profile", isAuth, upload.single("image"), editProfile); //sửa infor cá nhân
userRouter.get("/search", isAuth, search); 

module.exports = userRouter;