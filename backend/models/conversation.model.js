import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId, //định nghĩa một trường trong schema MongoDB, 
        ref: "User",                          //dùng để lưu ID của một user, đồng thời cho phép liên kết (join) 
        required: true                        //sang bảng User khi truy vấn dữ liệu.
    }],
    messages: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Message"
    }], 

},{timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;