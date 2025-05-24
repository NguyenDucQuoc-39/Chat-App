import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "Không tìm thấy token" });
        }
        let verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(verifiedToken);
        req.userId = verifiedToken.id;
        next();
    } catch (error) {
        console.error("Lỗi trong quá trình xác thực:", error);
        return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
}

export default isAuth;
// export default isAuth;