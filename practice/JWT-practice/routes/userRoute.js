import express from "express";
import UserController from "../controller/UserController.js";
import auth from "../middlewares/auth.js";
const router = express.Router()

router.post("/add", UserController.Add)
router.get("/GetAllUser", UserController.getAllUser)
router.post("/login", UserController.login)
router.get("/authlogin", auth, UserController.authLogin)

export default router