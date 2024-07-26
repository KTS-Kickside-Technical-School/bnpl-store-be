import httpStatus from "http-status";
import wishlistRepository from "../repository/wishlistRepository.js";

export const addProductToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.product._id;

    const data = { userId, productId };
    const wishlist = await wishlistRepository.addProductToWishlist(data);
    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Product Added To Wishlist",
      data: { wishlist },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

export default { addProductToWishlist };
