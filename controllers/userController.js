import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()


const getUsers = async (req, res) => {
    try {
      
      const users= await User.find({role: "member"});
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

    try {
      var user = new User(req.body)
      await user.save()
      res.status(200).json(user)
    } catch (error) {
      console.error(error)
    }

        
        
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
  res.status(500).json({ error: 'Internal Server Error For Finding Member' });
  }
}

const normalizePhoneNumber = (number) => {
  return number.replace(/\D/g, ''); // Remove non-digit characters
};

const login = async (req,res) => {
  const { number, password } = req.body;
  const normalizedPhoneNumber = normalizePhoneNumber(number);

    try {
      const user = await User.findOne({ number: normalizedPhoneNumber });
      if (user.role === 'admin' && password !== 'churchadmin') {
        return res.status(401).json({ message: 'Invalid admin password' });
    }

    // Check the role and password for members
    if (user.role === 'member' && user.password !== password) {
        return res.status(401).json({ message: 'Invalid member password' });
    }


        if (user) {
          // Generate a JWT token
          const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
          return res.json({ token });
      } else {
          return res.status(404).json({ message: 'User not found' });
      }

        // In a real application, you should verify the password too
        // res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
}

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token format
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });

        // Extract userId and store it in the request object
        req.userId = decodedToken._id;
        req.role = decodedToken.role; // You can also extract the role if needed
        
        next(); // Pass control to the next middleware or route handler
    });
};





export {getUsers,addUser, getUserById, updateUserbyID, deleteUser, getUserWithFamily, login, verifyToken}