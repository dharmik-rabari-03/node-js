import express from "express";
import event from "../model/eventModel.js";
import fs from "fs";
import httpError from "../middlewares/httpError.js";

const AddEvent = async (req, res, next) => {
  try {
    const { eventName, eventDate, eventVenue, ticketPrice } = req.body;

    const eventPoster = req.files?.eventPoster?.[0]?.path || null;
    const eventImages = req.files?.eventImages?.map((file) => file.path) || [];
    const eventDocument = req.files?.eventDocument?.[0]?.path || null;

    const newEvent = new event({
      eventName,
      eventDate,
      eventVenue,
      ticketPrice,
      eventPoster,
      eventImages,
      eventDocument,
    });

    await newEvent.save();

    res
      .status(201)
      .json({ success: true, message: "new event added", newEvent });
  } catch (error) {
    next(new httpError(error.message));
  }
};

const GetAll = async (req, res, next) => {
  try {
    const GetAll = await event.find();

    if (GetAll.length <= 0) {
      return next(new httpError("no event found"), 404);
    }

    res.status(200).json({ success: true, message: "event found", GetAll });
  } catch (error) {
    throw new httpError(error.message);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getById = await event.findById(id);

    if (!getById) {
      return next(new httpError("no event found"), 404);
    }
    res.status(200).json({ success: true, message: "event found", getById });
  } catch (error) {
    throw new httpError(error.message);
  }
};

const DeleteEvent = async (req, res, next) => {
  try {
    const id = req.params.id;

    const EventDelete = await event.findById(id);

    if (!EventDelete) {
      return next(new httpError("no event found with this id", 404));
    }

    const FilesToDelete = [
      EventDelete.eventPoster,
       ...EventDelete.eventImages,
      EventDelete.eventDocument];

    FilesToDelete.forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      } else {
        next(new httpError("failed to delete"));
      }
    });

    await event.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "event delete successfully" });
  } catch (error) {
    next(new httpError(error.message));
  }
};

export default { AddEvent, GetAll, getById, DeleteEvent };
