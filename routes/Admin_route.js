import { Router } from "express";
import { addDoctor, signUp, signIn } from '../controllers/admin_contoller.js';
import { checkAdminSession } from "../middlewares/auth.js";

const adminRouter = Router();

adminRouter.post('/admin/signup', signUp);
adminRouter.post('/admin/signin', signIn);
adminRouter.post('/admin/add/doctor', checkAdminSession, addDoctor);
export default adminRouter;
  