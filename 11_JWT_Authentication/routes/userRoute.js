import express from "express";
import userController from "../controller/userController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.Add);

router.get("/GetAllUser", auth, userController.GetAllUser);

router.post("/login", userController.loggin);

router.get("/authLogin", auth, userController.AuthLoggin);

router.get("/logout", auth, userController.logout);

router.get("/logutAll", auth, userController.logutAll);

router.patch("/Update",auth,userController.UpdateUser)

router.delete("/DeleteUser",auth,userController.DeleteUser)

export default router;
