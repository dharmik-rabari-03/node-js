import express from "express";

import controller from "../controller/eventController.js";
import upload from "../middlewares/upload.js";
import event from "../model/eventModel.js";
import httpError from "../middlewares/httpError.js";

const router = express.Router();

router.post(
  "/Add",
  upload.fields([
    {
      name: "eventPoster",
      maxCount: 1,
    },
    {
      name: "eventImages",
      maxCount: 5,
    },
    {
      name: "eventDocument",
      maxCount: 1,
    },
  ]),
  controller.AddEvent,
);



router.get("/GetAll", controller.GetAll);
router.get("/:id", controller.getById);
router.delete("/:id",controller.DeleteEvent)

export default router;
