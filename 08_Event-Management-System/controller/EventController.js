import event from "../model/eventModel.js";

import httpError from "../middlewares/httpError.js";

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

export default { create };
