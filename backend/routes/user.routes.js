import express from 'express';
import {  editProfile ,getCurrentUser, getOtherUsers, search } from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';
import multer from 'multer';

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser); // lấy infor user hiện tại
userRouter.get("/others", isAuth, getOtherUsers);  // lấy list user khác
userRouter.put("/profile", isAuth, upload.single("image"), editProfile); //sửa infor cá nhân
userRouter.get("/search", isAuth, search); 

export default userRouter;