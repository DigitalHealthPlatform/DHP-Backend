import { Router } from 'express';
import { scheduleAppointment, getPatientAppointments, getDoctorAppointments, updateAppointmentStatus } from '../controllers/appointment_controller.js';

const appointmentRouter = Router();

appointmentRouter.post('/schedule', scheduleAppointment);
appointmentRouter.get('/patient/:patientId', getPatientAppointments);
appointmentRouter.get('/doctor/:doctorId', getDoctorAppointments);
appointmentRouter.patch('/status/:id', updateAppointmentStatus);

export default appointmentRouter;
