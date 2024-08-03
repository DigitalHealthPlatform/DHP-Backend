import Joi from "joi";


export const userSchema = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email: Joi.string().email().required(),
    userName: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password'),
    termsAndConditions: Joi.boolean().required(),
    

})

export const loginValidator = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().required(),
});
   
export const updateUserValidator = Joi.object({
    name: Joi.string(),
    role: Joi.string().valid('admin'),
});
    
