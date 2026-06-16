import express from "express";
import userController from "../controller/userController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.Add);

router.get("/GetAllUser", auth,userController.GetAllUser);

router.post("/login", userController.loggin);

router.get("/authLogin", auth, userController.AuthLoggin);

export default router;
