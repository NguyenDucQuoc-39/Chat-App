//import các thư viện cần thiết
import express from "express"; // Framework web cho Node.js
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000; 

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true  //cho phép gửi cookie qua cors
}))

app.use(express.json()) // nhận dữ liệu JSON từ client
app.use(cookieParser()) //đọc cookie từ request

// Định nghĩa các route chính cho API
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/message", messageRouter)

server.listen(PORT, () => {
    connectDb()
    console.log("Server Đã Khởi Động!", `Server đã khởi động tại http://localhost:${PORT}`)
});
 