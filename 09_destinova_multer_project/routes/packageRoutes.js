import express from "express";

import upload from "../middlewares/upload.js";
import packageController from "../controller/packageController.js";

const router = express.Router();

router.post("/add", upload.single("image"), packageController.add);
router.get("/GetAllPackage",packageController.GetAllPackage)
router.get("/:id",packageController.GetById)
router.delete("/:id",packageController.DeletePackage)

router.patch("/:id",upload.single("image"),packageController.UpdatePackage)

export default router;