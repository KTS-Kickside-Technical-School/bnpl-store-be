import Joi from "joi";

export const newWishListchema = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
})