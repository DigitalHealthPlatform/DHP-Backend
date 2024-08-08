import Joi from 'joi';

const appointmentSchema = Joi.object({
  patientId: Joi.string().required(),
  doctorId: Joi.string().required(),
  appointmentDate: Joi.date().required(),
  status: Joi.string().valid('Scheduled', 'Completed', 'Cancelled').default('Scheduled'),
});

export default appointmentSchema;
