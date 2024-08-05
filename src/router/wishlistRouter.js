import express from "express";
import { isUserAuthorized } from "../middlewares/userAuthorization.js";
import { bodyValidation } from "../middlewares/validations.js";
import { newWishListchema, viewWishListSchema, DeleteWishlistItemSchema } from "../modules/wishlist/validation/wishlistValidation.js";
import { isProductExists } from "../middlewares/productsValidation.js";
import { isProductAlreadyInWishlist } from "../middlewares/wishlistMiddlewares.js";
import wishlistController from "../modules/wishlist/controller/wishlistController.js";

const router = express.Router();
router.post(
  "/user-add-product-to-wishlist",
  isUserAuthorized(["customer"]),
  bodyValidation(newWishListchema),
  isProductExists,
  isProductAlreadyInWishlist,
  wishlistController.addProductToWishlist
);

router.get("/View-wishlist",
  isUserAuthorized(["customer"]),
  bodyValidation(viewWishListSchema),
  wishlistController.getUserWishList
 )
router.delete("/delete-product-from-wishlist",
  isUserAuthorized(["customer"]),
  bodyValidation(DeleteWishlistItemSchema),
  wishlistController.deleteProductfromWishlst
)

export default router;