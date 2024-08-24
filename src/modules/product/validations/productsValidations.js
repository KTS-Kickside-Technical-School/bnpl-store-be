import Joi from "joi";

export const createProductsSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
    price: Joi.number().required(),
    isAvailable: Joi.boolean(),
    quantity: Joi.number().required(),
    discount: Joi.number(),
    countingUnit: Joi.string().required(),
    category: Joi.string().required()
})

export const deleteProductSchema = Joi.object({
    productId: Joi.string().required()
})

export const createCategorySchema = Joi.object({
    name: Joi.string().required()
})

export const updateCategorySchema = Joi.object({
    categoryId: Joi.string().required(),
    name: Joi.string().required()
})

export const deleteCategorySchema =Joi.object({
    categoryId: Joi.string().required()
})