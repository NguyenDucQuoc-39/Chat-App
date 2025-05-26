import express from "express";
import { login, logOut, signUp } from "../controllers/auth.controllers.js"
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/user.controller.js";
import { getOtherUsers } from "../controllers/user.controller.js";
const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)
authRouter.get("/current", isAuth, getCurrentUser)
authRouter.get("/others", isAuth, getOtherUsers)


export default authRouter