import mongoose from 'mongoose'


const messageSchema = new mongoose.Schema({
    id: Number,
    date: String,
    message:String,
    vicarName: String,
    createdAt: Date
});

const Message = mongoose.model('message', messageSchema);

export default Message;