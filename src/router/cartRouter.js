import express from "express";
import { isUserAuthorized } from "../middlewares/userAuthorization.js";
import { bodyValidation } from "../middlewares/validations.js";
import { newCartShema, removeCartItemSchema } from "../modules/cart/validations/cartValidation.js";
import { isProductExists } from "../middlewares/productsValidation.js";

import { isCartProductsExists, isProductAlreadyToCart, isProductExistsToCart } from "../middlewares/cartMiddlewares.js";
import cartController from "../modules/cart/controller/cartController.js";

const router = express.Router();

router.post(
    "/add-update-product-to-cart",
    isUserAuthorized(["customer"]),
    bodyValidation(newCartShema),
    isProductExists,
    isProductAlreadyToCart,
    cartController.addProductToCart
);

router.get("/view-cart-items", isUserAuthorized(["customer"]), isCartProductsExists, cartController.getCartItems);

router.delete("/remove-product-from-cart",
    isUserAuthorized(["customer"]),
    bodyValidation(removeCartItemSchema),
    isProductExistsToCart,
    cartController.removeProductFromCart
);


export default router;