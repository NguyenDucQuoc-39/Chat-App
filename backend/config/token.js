import jwt from "jsonwebtoken";

const genToken = async (userId) => {
    try {
        // Tạo token
        const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn: "7d" })
        return token
    } catch (error) {
        console.log("gen token error", error)
    }
}
export default genToken