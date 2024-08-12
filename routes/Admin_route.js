import { Router } from "express";
import { addDoctor, assignDoctor, requestConsultation } from '../controllers/admin_contoller.js';

const adminRouter = Router();

adminRouter.post('/admin/add/doctor', addDoctor);
adminRouter.patch('/assign/doctor/:id', assignDoctor);
adminRouter.post('/request/consultation/:id', requestConsultation);

export default adminRouter;
  