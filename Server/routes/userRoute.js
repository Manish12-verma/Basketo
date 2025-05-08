import express from 'express';
import { registerUser,loginUser,isAuth,logoutUser} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/is-auth', authUser,isAuth)
userRouter.get('/logout', authUser,logoutUser); // Assuming you have a logoutUser function in your controller

export default userRouter; 