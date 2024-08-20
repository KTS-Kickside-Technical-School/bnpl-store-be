import express from "express";
import { isUserAuthorized } from "../middlewares/userAuthorization.js";
import { bodyValidation } from "../middlewares/validations.js";
import { newCartShema, removeCartItemSchema } from "../modules/cart/validations/cartValidation.js";
import { isProductExists} from "../middlewares/productsValidation.js";

 import { isProductAlreadyToCart, isProductExistsToCart } from "../middlewares/cartMiddlewares.js";
 import cartController from "../modules/cart/controller/cartController.js";

 const router = express.Router();

 router.post(
"/add-Update-product-to-cart", 
isUserAuthorized(["customer"]),
 bodyValidation(newCartShema), 
 isProductExists, 
 isProductAlreadyToCart, 
 cartController.addProductToCart
);

router.delete("/remove-product-from-cart",
    isUserAuthorized(["customer"]),
    bodyValidation(removeCartItemSchema),
    isProductExistsToCart,
    cartController.removeProductFromCart
)

export default router;