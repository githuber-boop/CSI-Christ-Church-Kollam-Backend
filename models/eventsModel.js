import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    eventName: String,
    date:String,
    time: String,
    eventDetails: String,
    imageUrl: { type: String },
    createdAt: Date
});

const Event = mongoose.model('events', eventSchema);

export default Event;