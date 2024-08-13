import { Router } from "express";
import { signup, login,logout, getHealthRecords} from "../controllers/user_controller.js";

export const userRouter = Router();

userRouter.post('/user/auth/signup', signup);
userRouter.post('/user/auth/login', login);
userRouter.post('/user/auth/logout', logout);
userRouter.get('/user/healthrecords/:userId', getHealthRecords);


 
