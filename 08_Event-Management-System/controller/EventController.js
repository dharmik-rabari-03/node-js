import fs from "fs";

import event from "../model/eventModel.js";

import httpError from "../middlewares/httpError.js";


const AddEvent =async (req, res,next) => {


    try {
          const {
    EventName,
    EventDate,
    EventVenue,
    EventDescription,
    TicketPrice,
  } = req.body;

  const EventPoster=req.files?.EventPoster?.[0]
  const EventBanner=req.files?.EventBanner || [] 
  const EventSpeaker=req.files?.EventSpeaker || []

  const NewEvent = new event({
    EventName,
    EventDate,
    EventVenue,
    EventDescription,
    TicketPrice,
    EventPoster,
    EventBanner,
    EventSpeaker
  });


  await event.save()

  res.status(201).json({success:true,message:"new event added"},NewEvent)

    } catch (error) {

         next(new httpError(error.message,500))
        
    }

};
