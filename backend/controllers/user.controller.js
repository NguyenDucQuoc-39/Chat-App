export const getCurrentUser = async (req, res) => {
    try {
        let userId = req.userId;
        let user = await user.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        if (!userId) {
            return res.status(200).json({ message: "Không tìm thấy ID người dùng" });
        }
    } catch (error) {
        return res.status(500).json({ message: `Lỗi máy chủ nội bộ ${error.message}` });
    }
}

