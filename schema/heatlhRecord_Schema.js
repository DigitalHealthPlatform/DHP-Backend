import Joi from 'joi';

const healthRecordSchema = Joi.object({
  userId: Joi.string().required(),
  records: Joi.array().items(Joi.object()).required(),
});

export default healthRecordSchema;
