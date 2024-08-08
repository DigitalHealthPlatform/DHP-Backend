import { Router } from "express";
import { signup, login,logout, getHealthRecords} from "../controllers/user_controller.js";

export const userRouter = Router();

userRouter.post('/auth/signup', signup);
userRouter.post('/auth/login', login);
userRouter.post('/auth/logout', logout);
userRouter.get('/healthrecords/:userId', getHealthRecords);


 
