import Joi from "joi"


export const updateUserSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.number(),
    nId: Joi.number(),
})