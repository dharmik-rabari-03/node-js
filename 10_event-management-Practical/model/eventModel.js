import mongoose from "mongoose";

const eventModel = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventVenue: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  eventPoster: {
    type: String,
    required: true,
  },
  eventImages: {
    type: [String],
  },
  eventDocument: {
    type: String,
  },
});

const event = mongoose.model("event", eventModel);

export default event;
