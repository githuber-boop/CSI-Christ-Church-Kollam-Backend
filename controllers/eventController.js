import Event from "../models/eventsModel.js";

const getEvent = async (req, res) => {
    try {
      
      const event= await Event.find({});
      if (!event) {
        return res.status(404).json({ error: 'Users not found' });
      }
       res.status(200).json(event)
    } catch (error) {
      console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addEvent = async (req,res)=>{
    var eventItem = {
      eventName : req.body.eventName,
      date:req.body.date,
      time: req.body.time,
      eventDetails: req.body.eventDetails,
      createdAt:new Date()
    }

    console.log(eventItem)
    var event = new Event(eventItem)
    await event.save()
    res.status(200).json(event)
    
}

export {getEvent ,addEvent }