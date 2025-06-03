import http from 'http';
import express from 'express';
import { Server } from 'socket.io'; //thư viện socket.io cho realtime

let app = express();

// Tạo HTTP server từ app express
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

//hàm lưu id user và socketid user
const userSocketMap = {};

export const getReceiverSocketId = (receiver) => {
    return userSocketMap[receiver]
};

// Lắng nghe sự kiện kết nối từ client
io.on("connection", (socket) => { 
    const userId = socket.handshake.query.userId;

    // Lấy userId từ query khi client kết nối
    if (userId != undefined) {
        userSocketMap[userId] = socket.id;
        console.log("Người dùng đã kết nối:", userId);
    }
    // Gửi danh sách người dùng đang online cho tất cả người dùng khác
    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        console.log("Người dùng đã ngắt kết nối:", userId);
    });
})

export { app, server, io };