import Event from "../models/eventsModel.js";


const getEvent = async (req, res) => {
    try {
      
      const event= await Event.find({}).sort({ createdAt: -1 });
      if (!event) {
        return res.status(404).json({ error: 'Users not found' });
      }
       res.status(200).json(event)
    } catch (error) {
      console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addEvent =  async (req,res)=>{
    var eventItem = {
      eventName : req.body.eventName,
      date:req.body.date,
      time: req.body.time,
      eventDetails: req.body.eventDetails,
      imageUrl:req.body.imageUrl,
      createdAt:new Date()
    }

    console.log(eventItem)
    var event = new Event(eventItem)
    await event.save()
    res.status(200).json(event)
    
}

const deleteEvent = async (req,res)=>{
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
 }

export {getEvent ,addEvent, deleteEvent }