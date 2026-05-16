import express from "express";
import {AddStudent ,getAllStudent} from "../controller/studentController.js";

const route = express.Router();

route.post("/add", AddStudent);
route.get("/AllStudent", getAllStudent);

export default route;
