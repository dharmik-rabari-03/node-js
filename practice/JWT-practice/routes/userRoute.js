import express from "express";
import UserController from "../controller/UserController.js";
import auth from "../middlewares/auth.js";
const router = express.Router()

router.post("/add", UserController.Add)
router.get("/GetAllUser", UserController.getAllUser)
router.post("/login", UserController.login)
router.get("/authlogin", auth, UserController.authLogin)
router.delete("/delete", auth, UserController.Delete)
router.patch("/update",auth,UserController.update)
router.post("/logout",auth,UserController.logout)
router.post("/logoutAll",auth,UserController.logoutAll)

export default router