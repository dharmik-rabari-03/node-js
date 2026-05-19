import express from "express";
import studentController from "../controller/studentController.js";

const route = express.Router();

route.post("/add", studentController.AddStudent);
route.get("/AllStudent", studentController.getAllStudent);
route.delete("/delete/:id", studentController.Delete);

export default route;
