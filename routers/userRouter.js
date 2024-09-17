import express from 'express';
import { getUsers, addUser, getUserById,verifyToken, updateUserbyID , deleteUser, getUserWithFamily, login} from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.post('/newUser', addUser)
// userRouter.get('/:id',getUserById)
userRouter.put('/:id',updateUserbyID)
userRouter.delete('/:id',deleteUser)
userRouter.get('/:id',getUserWithFamily)
userRouter.post('/login', login)

userRouter.use(verifyToken)
userRouter.get('/family-members', verifyToken, async (req, res) => {
  try {
      // Use req.userId to fetch user data from MongoDB
      const user = await User.findById(req.userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Assuming the user's document has a field 'familyMembers'
      res.json({
          message: 'Family members retrieved successfully',
          familyMembers: user.familyMembers // Send the family members array
      });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

export default userRouter;