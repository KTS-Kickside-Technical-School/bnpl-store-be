import Joi from "joi";

export const newCartShema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().required()
})

export const removeCartItemSchema = Joi.object({
    productId: Joi.string().required()
})

export const stripeProductSchema = Joi.object({
    productInfo: Joi.object().required().keys({
        default_price_data: Joi.object().required().keys({
            unit_amount: Joi.number().required().messages({
                'any.required': 'unit_amount is required and is unit_amount',
                'string.base': 'unit_amount must be a string and is unit_amount',
                'string.empty': 'unit_amount is not allowed to be empty and is unit_amount',
            }),
        })
    })
});

export const checkoutSessionSchema = Joi.object({
    sessionInfo: Joi.object().required().keys({
        success_url: Joi.string().messages({
            'any.required': 'success_url is required',
            'string.base': 'success_url must be a string',
            'string.empty': 'success_url is not allowed to be empty',
        }),
        cancel_url: Joi.string().messages({
            'any.required': 'cancel_url is required',
            'string.base': 'cancel_url must be a string',
            'string.empty': 'cancel_url is not allowed to be empty',
        }),
        return_url: Joi.string().messages({
            'any.required': 'return_url is required',
            'string.base': 'return_url must be a string',
            'string.empty': 'return_url is not allowed to be empty',
        }),
        line_items: Joi.array().required().items(
            Joi.object().keys({
                quantity: Joi.number().integer().default(1).required(),
                price: Joi.string().required().messages({
                    'any.required': 'price is required and is price id',
                    'string.base': 'price must be a string and is price id',
                    'string.empty': 'price is not allowed to be empty and is price id',
                }),
            })
        ),
    })
});