import Joi from "joi";

export const addProductsToCartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
  
});

export const removeProductToCart = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  
  
});
