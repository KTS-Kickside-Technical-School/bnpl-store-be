import Joi from "joi";

export const newTermsSchema = Joi.object({
    Name: Joi.string().required(),
    Type: Joi.string().required(),
    Text: Joi.string().required(),
    Status: Joi.string().required()
})

