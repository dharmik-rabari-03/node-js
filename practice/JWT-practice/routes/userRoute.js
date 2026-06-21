import express from "express"
import userController from "../controller/userController.js"

const route = express.Router()

route.post("/add", userController.add)
route.get("/AllUser", userController.GetAlluser)
route.post("/login", userController.loggin)
route.get("/AuthLogin", userController.AuthLogin)

export default route