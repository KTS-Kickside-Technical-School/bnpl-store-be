import Joi from "joi";

export const newCartShema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().required()
})

export const removeCartItemSchema = Joi.object({
    productId: Joi.string().required()
})