import Message from '../models/messageModel.js'

const getMessage = async (req, res) => {
    try {
      
      const message= await Message.find({});
      if (!message) {
        return res.status(404).json({ error: 'Users not found' });
      }
       res.status(200).json(message)
    } catch (error) {
      console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addMessage = async (req,res)=>{
    var messageItem = {
      id:1,
      date : req.body.date,
      message:req.body.message,
      vicarName: req.body.vicarName,
      createdAt:new Date()
    }

    console.log(messageItem)
    var message = new Message(messageItem)
    await message.save()
    res.status(200).json(message)
    
}

const updateMessage = async (req,res)=>{
    var messageItem = {
        date : req.body.date,
        message:req.body.message,
        vicarName: req.body.vicarName,
        createdAt:new Date()
    }

    await Message.findOneAndUpdate({ id: 1 }, req.body)

}


export {getMessage,addMessage, updateMessage}
