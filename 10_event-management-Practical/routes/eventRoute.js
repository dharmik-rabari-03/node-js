import express from "express";
import upload from "../middlewares/upload.js";
import controller from "../controller/eventController.js";

const router = express.Router();

router.post(
  "/add",
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
  controller.add,
);

router.get("/getAllEvent", controller.getAllEvent);
router.get("/:id", controller.getById);

router.delete("/:id", controller.DeleteById);

router.patch(
  "/:id",
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
      maxCount: 5,
    },
  ]),
  controller.UpdateEventById,
);

export default router;
