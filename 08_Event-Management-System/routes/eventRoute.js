import express from "express";

import upload from "../middlewares/upload.js";
import httpError from "../middlewares/httpError.js";

import controller from "../controller/EventController.js";
import event from "../model/eventModel.js";

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    {
      name: "EventPoster",
      maxCount: 1,
    },
    {
      name: "EventBanner",
      maxCount: 5,
    },
    {
      name: "EventSpeaker",
      maxCount: 5,
    },
    {
      name: "EventDocument",
      maxCount: 5,
    },
  ]),
  controller.create,
);

router.get("/getEvent", controller.getAllEvent)
router.get("/:id", controller.GetEventById)

router.delete("/:id", controller.DeleteById)

router.patch(
  "/:id",
  upload.fields([
    {
      name: "EventPoster",
      maxCount: 1,
    },
    {
      name: "EventBanner",
      maxCount: 5,
    },
    {
      name: "EventSpeaker",
      maxCount: 5,
    },
    {
      name: "EventDocument",
      maxCount: 5,
    },

  ]),
  controller.UpdateEventById
);
export default router;
