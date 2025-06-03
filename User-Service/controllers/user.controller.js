const uploadOnCloudinary = require("../config/cloudinary");
const User = require("../models/user.model");


export const getCurrentUser = async (req, res) => {
    try {
        let userId = req.userId; // Lấy userId từ middleware xác thực (isAuth)
        let user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "Không tìm thấy người dùng" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Người dùng hiện tại lỗi ${error.message}` });
    }
}


export const editProfile = async (req, res) => {
    try {
      let {name} = req.body;
      let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }
      let user = await User.findByIdAndUpdate(
        req.userId, 
        {name,image}, { new: true }).select("-password"); // Cập nhật tên và ảnh, trả về user mới
      

        if (!user) {
            return res.status(400).json({ message: "Không tìm thấy người dùng" });
        }
      return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `Lỗi Profile ${error.message}` });
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const all = await User.find();
        console.log(" Tất cả người dùng trong DB:", all);
        let users = await User.find({ _id: { $ne: req.userId } }).select("-password");
        if (!users) {
            return res.status(400).json({ message: "Không tìm thấy người dùng" });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi server ${error.message}` });
    }
}

export const search = async (req, res) => {
    try {
        let { query } = req.query; // Lấy chuỗi tìm kiếm từ query string
        if(!query) {
            return res.status(400).json({ message: "Không có truy vấn tìm kiếm" });
        }

        // Tìm user theo tên hoặc userName, không phân biệt hoa thường
        let users = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { userName: { $regex: query, $options: "i" } }
            ]
        })
        return res.status(200).json(users); //trả về list user
    } catch (error) {
        return res.status(500).json({ message: `Lỗi tìm kiếm ${error.message}` });
    }
}

module.exports = {
    getCurrentUser,
    editProfile,
    getOtherUsers,
    search
};