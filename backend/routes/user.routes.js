import express from 'express';
import { getCurrentUser } from '../controllers/user.controller.js';
import { editProfile } from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';
import multer from 'multer';

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.put("/profile", isAuth, upload.single("image"), editProfile);

export default userRouter;