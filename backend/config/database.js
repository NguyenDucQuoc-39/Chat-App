import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Đã kết nối Database")
    } catch (error) {
        console.log("Lỗi kết nối Database")
    }
}

export default connectDb