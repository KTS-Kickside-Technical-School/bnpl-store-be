import Joi from "joi";

export const createProductsSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
    price: Joi.number().required(),
    isAvailable: Joi.boolean(),
    quantity: Joi.number().required(),
    discount: Joi.number(),
    countingUnit: Joi.string().required()
})