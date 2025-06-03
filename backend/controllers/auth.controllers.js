import genToken from "../config/token.js";
import User from "../models/user.model.js"; 
import bcrypt from "bcryptjs";


export const signUp = async (req, res) => {

    try {
        const { userName, email, password } = req.body

        const checkUserByUserName = await User.findOne({ userName })
        if (checkUserByUserName) {
            return res.status(400).json({ message: "Người dùng đã tồn tại!" })
        }
        const checkUserByEmail = await User.findOne({ email })
        if (checkUserByEmail) {
            return res.status(400).json({ message: "Email đã tồn tại!" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Mật khẩu phải ít nhất 6 kí tự!" })
        }

        //mã hóa (hash) mật khẩu bằng bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            userName, email, password: hashedPassword
        })

        //gọi hàm genToken 
        //tạo một chuỗi token (JWT) từ _id của user.
        const token = await genToken(user._id) 

        //tạo token và lưu vào cookie
        res.cookie("token", token, {
            httpOnly: true, //Cookie chỉ được truy cập bởi server
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            sameSite: "Strict", //Cookie chỉ được gửi trong các request cùng domain
            secure: false
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({ message: `Lỗi Đăng Ký ${error}` })
    }
}

export const login = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Người dùng không tồn tại!" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu chưa chính xác!" })
        }

        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "Strict",
            secure: false
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `Lỗi Đăng Nhập ${error}` })
    }
}


export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Đăng Xuất Thành Công!" })
    } catch (error) {
        return res.status(500).json({ message: `Lỗi Đăng Xuất ${error}` })
    }
}