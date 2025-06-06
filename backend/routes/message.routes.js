import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';
import { sendMessage } from '../controllers/message.controller.js';
import { getMessages } from '../controllers/message.controller.js';

const messageRouter = express.Router();

//định nghĩa endpoint như gửi và lấy lịch sử tin nhắn
messageRouter.post("/send/:receiver", isAuth, upload.single("image"), sendMessage);
messageRouter.get("/get/:receiver", isAuth, getMessages);
export default messageRouter;