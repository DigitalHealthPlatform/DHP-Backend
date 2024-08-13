import { Router } from 'express';
import { scheduleAppointment, getPatientAppointments, getDoctorAppointments, updateAppointmentStatus } from '../controllers/appointment_controller.js';

const appointmentRouter = Router();

appointmentRouter.post('/appointment/schedule', scheduleAppointment);
appointmentRouter.get('/appointment/patient/:patientId', getPatientAppointments);
appointmentRouter.get('/appointment/doctor/:doctorId', getDoctorAppointments);
appointmentRouter.patch('/appointment/status/:id', updateAppointmentStatus);

export default appointmentRouter;
