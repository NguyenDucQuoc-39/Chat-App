import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";


export const getCurrentUser = async (req, res) => {
    try {
        let userId = req.userId;
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
      let user = await User.findByIdAndUpdate(req.userId, {
          name,
          image
        }, { new: true }).select("-password");
      

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
        console.log(" All users in DB:", all);
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
        let { query } = req.query;
        if(!query) {
            return res.status(400).json({ message: "Không có truy vấn tìm kiếm" });
        }
        let users = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { userName: { $regex: query, $options: "i" } }
            ]
        })
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi tìm kiếm ${error.message}` });
    }
}