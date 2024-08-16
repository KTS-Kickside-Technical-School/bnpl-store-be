import express from "express";
import { isUserAuthorized } from "../middlewares/userAuthorization.js";
import { bodyValidation } from "../middlewares/validations.js";
import { newCartShema } from "../modules/cart/validations/cartValidation.js";
import { isProductExists} from "../middlewares/productsValidation.js";

 import { isProductAlreadyToCart } from "../middlewares/cartMiddlewares.js";
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

export default router;