import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

let app = express();

const server = http.createServer(app);
const io = new Server(server,{
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

    if(userId != undefined) { 
        userSocketMap[userId] = socket.id;
        console.log("Người dùng đã kết nối:", userId); 
    }
     // Gửi danh sách người dùng đang online
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); 


    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        console.log("Người dùng đã ngắt kết nối:", userId);
    });
})

export {app, server, io};