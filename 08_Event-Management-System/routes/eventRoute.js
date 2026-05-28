import express from "express"

import upload from "../middlewares/upload.js"
import httpError from "../middlewares/httpError.js"

import controller from "../controller/EventController.js"

const router = express.Router()

router.post("add",
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
            name: EventDocument,
            maxCount: 5
        }
    ]),
    controller.createProfile
)