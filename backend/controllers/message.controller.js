import uploadOnCloudinary from "../config/cloudinary.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js"; 
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js"; // Import the io instance

export const sendMessage = async (req, res) => {
    try {
        let sender = req.userId;
        let {receiver} = req.params;
        let {message} = req.body;
        
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path);
        } 

        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        });

        let newMessage = await Message.create({
            sender, receiver, message, image
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [sender, receiver],
                messages: [newMessage._id]
            });
        }else {
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }
        // Emit the new message to the receiver's socket
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