import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

let app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

const userSocketMap = {};
export const getReceiverSocketId = (receiver) => {
    return userSocketMap[receiver]
};

// Lắng nghe sự kiện kết nối từ client
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId != undefined) {
        userSocketMap[userId] = socket.id; // Lưu socket ID của người dùng
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Phát sự kiện cho tất cả người dùng về danh sách người dùng trực tuyến

    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export { app, server, io };