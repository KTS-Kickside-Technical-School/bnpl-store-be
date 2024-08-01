import Joi from "joi";

export const newWishListchema = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
})

export const viewWishListSchema = Joi.object({
    userId: Joi.string().required()
})

export const DeleteWishlistItemSchema = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required()
})