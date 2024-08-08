// import Joi from 'joi';

// const doctorSchema = Joi.object({
//   name: Joi.string().required(),
//   specialty: Joi.string().required(),
//   availability: Joi.boolean(),
//   contactDetails: Joi.string().required(),
// });

// export default doctorSchema;

import Joi from 'joi';

export const doctorSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  specialty: Joi.string().min(3).max(50).required(),
  availability: Joi.boolean().optional(),
  contactDetails: Joi.object({
    phone: Joi.string().optional(),
    email: Joi.string().email().optional(),
  }).optional(),
  // Add additional fields as needed
});

