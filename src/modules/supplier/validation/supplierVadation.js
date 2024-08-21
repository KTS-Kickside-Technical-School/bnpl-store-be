import Joi from "joi";

export const supplierSchema = Joi.object({
    Firstname: Joi.string().required(),
    Lastname: Joi.string().required(),
    Email: Joi.string().email().required(),
    Phone: Joi.string().required(),
    Location: Joi.string().required(),
    Company: Joi.string().required()
});

export const updateSupplierSchema = Joi.object({
    Firstname: Joi.string().optional(),
    Lastname: Joi.string().optional(),
    Email: Joi.string().email().optional(),
    Phone: Joi.string().optional(),
    Location: Joi.string().optional(),
    Company: Joi.string().optional()
  });