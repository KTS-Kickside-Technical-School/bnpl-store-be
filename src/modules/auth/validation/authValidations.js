import Joi from "joi"

const registerSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.email': 'Please enter a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password should have a minimum length of 6 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  })
});


export {registerSchema}