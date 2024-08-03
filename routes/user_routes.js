import { Router } from "express";
import { signup, login,logout} from "../controllers/user_controller.js";

export const userRouter = Router();

userRouter.post('/auth/signup', signup);
userRouter.post('/auth/login', login);
userRouter.post('/auth/logout', logout);


 
