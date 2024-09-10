import User from "../models/userModel.js";

const getUsers = async (req, res) => {
    try {
      
      const users= await User.find({});
      if (!users) {
        return res.status(404).json({ error: 'Users not found' });
      }
      console.log(users)
       res.status(200).json(users)
    } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUserById = async (req, res) => {
  try {
    const useritem = await User.findById(req.params.id);
    if (!useritem) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(req.params.id)
    res.status(200).json(useritem)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateUserbyID = async (req,res)=>{
  const useritem = await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
  console.log(useritem)
  res.status(200).json(useritem)
 }

const deleteUser = async (req,res)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
 }

const addUser = async (req,res)=>{
        var userItem = {
          name : req.body.name,
          address:req.body.address,
          number: req.body.number,
          email: req.body.email,
          dob:req.body.dob,
          weddingDte: req.body.weddingDte,
          baptism: req.body.baptism,
          confirmation: req.body.confirmation,
          familyMembers: req.body.familyMembers,
          role : "member",
          password : "kollamchurch",
          createdAt:new Date()
        }

        console.log(userItem)
        var user = new User(userItem)
        await user.save()
        res.status(200).json(user)
        
}

const getUserWithFamily = async (req,res) => {
  try {
      
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ error: 'Users not found' });
    }
    console.log(user)
     res.status(200).json(user)
  } catch (error) {
    console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
  }
}

const login = async (req,res) => {
  const { number } = req.body;

    try {
        const user = await User.findOne({ number }).lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // In a real application, you should verify the password too
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
}



export {getUsers,addUser, getUserById, updateUserbyID, deleteUser, getUserWithFamily, login}