import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.listen(PORT, () => {
    connectDb()
    console.log("Server Started!", `Server Started on http://localhost:${PORT}`)
});
 