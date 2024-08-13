import Joi from "joi";

export const addProductsToCartSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
  
});
