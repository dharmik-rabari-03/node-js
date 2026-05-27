import mongoose from "mongoose";

const EventModel = new Mongoose.schema(
  {
    EventName: {
      type: String,
      required: true,
      trim: true,
    },
    EventDate: {
      type: Date,
      required: true,
    },
    EventVenue: {
      type: String,
      required: true,
    },
    EventDescription: {
      type: String,
    },
    TicketPrice: {
      type: Number,
      required: true,
    },
    EventPoster: {
      type: [String],
      required: true,
    },
    EventBanner: {
      type: [String],
      required: true,
    },
    EventSpeaker: {
      type: [String],
      required: true,
    },
    
  },
  { timestamps: true },
);

const event =


mongoose.model("event", EventModel);

export default event;
