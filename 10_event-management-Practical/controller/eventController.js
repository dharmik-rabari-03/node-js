import Event from "../model/eventModel.js";
import httpError from "../middlewares/httpError.js";
import event from "../model/eventModel.js";
import fs from "fs";

async function add(req, res, next) {
  try {
    const { eventName, eventDate, eventVenue, ticketPrice } = req.body;

    if (!eventName || !eventDate || !eventVenue || !ticketPrice) {
      return next(new httpError("All fields are required", 400));
    }

    const eventPoster = req.files?.eventPoster?.[0]?.path || null;

    const eventImages = req.files?.eventImages?.map((file) => file.path) || [];

    const eventDocument = req.files?.eventDocument?.[0]?.path || null;

    const newEvent = new Event({
      eventName,
      eventDate,
      eventVenue,
      ticketPrice,
      eventPoster,
      eventImages,
      eventDocument,
    });

    await newEvent.save();

    return res.status(201).json({
      success: true,
      message: "Event added successfully",
      data: newEvent,
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
}

async function getAllEvent(req, res, netxt) {
  const AllEvent = await event.find();

  if (AllEvent.length <= 0) {
    res.status(404).json({ success: false, message: "no event found" });
  }

  res.status(200).json({ success: true, message: "event found", AllEvent });
}

async function getById(req, res, netxt) {
  const id = req.params.id;
  const eventById = await event.findById(id);

  if (!eventById) {
    res.status(404).json({ success: false, message: "no event found" });
  }

  res.status(200).json({ success: true, message: "event found", eventById });
}

const DeleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const eventData = await Event.findById(id);

    if (!eventData) {
      return next(new httpError("Event not found", 404));
    }

    const filesToDelete = [
      eventData.eventPoster,
      ...(eventData.eventImages || []),
      eventData.eventDocument,
    ];

    filesToDelete.forEach((file) => {
      if (file && fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    await Event.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

const UpdateEventById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const FindEvent = await event.findById(id);

    if (!FindEvent) {
      return next(new httpError("event not found", 404));
    }

    const updates = Object.keys(req.body || {});

    const allowed = [
      "eventName",
      "eventDate",
      "eventVenue",
      "EventDescription",
      "ticketPrice",
    ];

    const isAllowedField = updates.every((field) => allowed.includes(field));

    if (!isAllowedField) {
      return next(new httpError("only allowed field can be updated", 400));
    }

    if (req.files?.EventPoster) {
      fs.unlinkSync(FindEvent.EventPoster);

      FindEvent.EventPoster = req.files?.EventPoster?.[0]?.path || null;
    }

    if (req.files?.eventImages) {
      FindEvent.eventImages.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });
      FindEvent.eventImages =
        req.files?.eventImages?.map((file) => file.path) || null;
    }

    if (req.files?.eventDocument) {
      fs.unlinkSync(FindEvent.eventDocument);

      FindEvent.eventDocument = req.files?.eventDocument?.[0]?.path || null;
    }

    updates.forEach((update) => {
      FindEvent[update] = req.body[update];
    });

    await FindEvent.save();

    res.status(200).json({
      success: true,
      message: "event data updated successfully",
      FindEvent,
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

export default { add, getAllEvent, getById, DeleteById ,UpdateEventById};
