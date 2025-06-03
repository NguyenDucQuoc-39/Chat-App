import uploadOnCloudinary from "../config/cloudinary.js"; // Hàm upload ảnh lên Cloudinary
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js"; 
import { getReceiverSocketId } from "../socket/socket.js"; // Hàm lấy socketId của người nhận
import { io } from "../socket/socket.js"; //Đối tượng socket.io để gửi event realtime

export const sendMessage = async (req, res) => {
    try {
        let sender = req.userId;
        let {receiver} = req.params; // Lấy id người nhận từ URL
        let {message} = req.body; 
        
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path);
        } 

        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        });
        
        //tạo tin nhắn mới
        let newMessage = await Message.create({
            sender, receiver, message, image
        });
         // Nếu chưa có cuộc trò chuyện, tạo mới
        if(!conversation) {
            conversation = await Conversation.create({
                participants: [sender, receiver],
                messages: [newMessage._id]
            });
        }else {
        // Nếu đã có, thêm id tin nhắn mới vào mảng messages
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }
         // Gửi tin nhắn realtime cho người nhận nếu đang online
        const receiverSocketId = getReceiverSocketId(receiver);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({ message:`Gửi tin nhắn bị lỗi: ${error.message}` });
    }
}

export const getMessages = async (req, res) => { 
    try {
        let sender = req.userId;
        let {receiver} = req.params;

        // Tìm cuộc trò chuyện giữa 2 user và lấy toàn bộ tin nhắn (populate)
        let conversation = await Conversation.findOne({
            participants: { $all: [sender,receiver]}
        }).populate("messages");
        if(!conversation) {
            return res.status(400).json({ message: "Không tìm thấy cuộc trò chuyện" });
        }

        return res.status(200).json(conversation?.messages);
    } catch (error) {
        return res.status(500).json({ message:`Lấy tin nhắn bị lỗi: ${error.message}` });
    }
}