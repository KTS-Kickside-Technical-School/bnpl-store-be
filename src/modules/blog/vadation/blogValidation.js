import Joi from "joi";

export const createBlogSchema = Joi.object({
    title: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
    summary: Joi.string().required(),
    description: Joi.string().required(),
    views: Joi.number(),
    uploaddate: Joi.date().required()

})
export const updateBlogSchema = Joi.object({
    title: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
    summary: Joi.string().required(),
    description: Joi.string().required(),
    views: Joi.number().required(),
    uploaddate: Joi.date().required()
})


export const deleteBlogSchema = Joi.object({
    blogId: Joi.string().required()
})