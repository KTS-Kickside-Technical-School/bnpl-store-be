import httpStatus from "http-status";
import wishlistRepository from "../modules/wishlist/repository/wishlistRepository.js";

export const isProductAlreadyInWishlist = async (req, res, next) => {
  try {
    const updatedData = { productId, userId };
    const existingWishlist = await wishlistRepository.getWishlistByAttributes(
      "productId",
      req.product._id,
      "userId",
      req.user._id
    );

    if (existingWishlist) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: "Product already exists in the wishlist.",
      });
    }
    next();
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};
