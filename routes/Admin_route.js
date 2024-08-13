import { Router } from "express";
import { addDoctor, signUp, signIn } from '../controllers/admin_contoller.js';
import { checkAdminSession } from "../middlewares/auth.js";

const adminRouter = Router();

adminRouter.post('/Admin/signup', signUp);
adminRouter.post('/Admin/signin', signIn);
adminRouter.post('/admin/add/doctor', checkAdminSession, addDoctor);
export default adminRouter;
  