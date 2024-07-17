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

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.email': 'Please enter a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password should have a minimum length of 6 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  }),
});

const resetpasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  })
});

const verifyEmailSchema = Joi.object({
  userId: Joi.string().required(),
  otp: Joi.string().required()
})


const newresetpasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password should have a minimum length of 6 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'string.empty': 'Confirm password is required',
    'any.required': 'Confirm password is required',
    'any.only': 'Passwords do not match'
  })

});

export {registerSchema,loginSchema, resetpasswordSchema ,newresetpasswordSchema,verifyEmailSchema}