import Joi from "joi";

export const supplierSchema = Joi.object({
    Firstname: Joi.string().required(),
    Lastname: Joi.string().required(),
    Email: Joi.string().email().required(),
    Phone: Joi.string().required(),
    Location: Joi.string().required(),
    Company: Joi.string().required()
})

