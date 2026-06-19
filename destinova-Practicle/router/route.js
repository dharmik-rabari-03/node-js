import destinovaController from "../controller/destinovaController.js";
import express from "express";
import upload from "../middlewares/upload.js";

const route = express.Router();

route.post("/add", upload.single("image"), destinovaController.add);
route.get("/getAll", destinovaController.getAll);
route.get("/:id", destinovaController.getById);
route.delete("/:id",destinovaController.deletepackage)
route.patch("/:id",upload.single("image"),destinovaController.updatePackage)


export default route;
