import event from "../model/eventModel.js";

import fs from "fs"

import httpError from "../middlewares/httpError.js";
import { json } from "express";

const create = async (req, res, next) => {
  try {
    const { EventName, EventDate, EventVenue, EventDescription, TicketPrice } =
      req.body;

    const EventPoster = req.files?.EventPoster?.[0]?.path || null;
    const EventBanner = req.files?.EventBanner?.map((file) => file.path) || [];
    const EventSpeaker =
      req.files?.EventSpeaker?.map((file) => file.path) || [];
    const EventDocument = req.files?.EventDocument?.[0]?.path || null;

    const NewEvent = new event({
      EventName,
      EventDate,
      EventVenue,
      EventDescription,
      TicketPrice,
      EventPoster,
      EventBanner,
      EventSpeaker,
      EventDocument,
    });

    await NewEvent.save();

    res
      .status(201)
      .json({ success: true, message: "new event added", data: NewEvent });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const getAllEvent = async (req, res, next) => {

  try {
    const GetEvent = await event.find({})

    if (GetEvent.length === 0) {
     return res.status(404)
        .json({ success: false, message: "no event found" })
    }

    res.status(200)
      .json({ success: true, total: GetEvent.length, message: "event found", GetEvent })
  } catch (error) {
    next(new httpError(error.message))

  }

}

const GetEventById = async (req, res, next) => {

  try {
    const id = req.params.id

    const getById = await event.findById(id)

    if (!getById) {
      return next(new httpError("event not found", 404));
    }

    res.status(200)
      .json({ success: true, message: "event found with this id", getById })
  } catch (error) {
    next(new httpError(error.message))
  }

}

const DeleteById = async (req, res, next) => {

  try {
    const id = req.params.id
    const deletebyid = await event.findById(id)

    if (!deletebyid) {
      return next(new httpError("event not found", 404));
    }


    const filesToDelete = [
      deletebyid.EventPoster,
      ...deletebyid.EventBanner,
      ...deletebyid.EventSpeaker,
      deletebyid.EventDocument

    ]

    filesToDelete.forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file)
      } else {
        return next(new httpError("failed to delete"))
      }
    })

    await event.findByIdAndDelete(id);


    res.status(200)
      .json({ success: true, message: "event deleted successfully" })

  } catch (error) {
    next(new httpError(error.message))
  }
}

export default { create, getAllEvent, GetEventById, DeleteById };
