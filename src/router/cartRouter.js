import express from "express";
import {
  bodyValidation,
  transformFilesToBody,
  isIdValid,
} from "../middlewares/validations.js";
import {
  addProductsToCartSchema,
  removeProductToCart,
} from "../modules/cart/validations/cartValidations.js";
import { isProductExists } from "../middlewares/productsValidation.js";
import { isUserAuthorized } from "../middlewares/userAuthorization.js";
import {
  isProductalreadyInCart,
  isProductInCart,
} from "../middlewares/cartMiddlewares.js";
import cartController from "../modules/cart/controller/cartController.js";

const router = express.Router();
router.post(
  "/add-product-to-cart",
  isUserAuthorized(["customer"]),
  bodyValidation(addProductsToCartSchema),
  isProductExists,
  isProductalreadyInCart,
  cartController.addProductsToCart
);
router.delete(
  "/remove-product-from-cart",
  isUserAuthorized(["customer"]),
  isProductExists,
  isProductInCart,
  cartController.removeProductToCart
);

export default router;
