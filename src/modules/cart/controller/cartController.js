import httpStatus from "http-status";
import cartRepository from "../repository/cartRepository.js";

const addProductsToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const data = { userId, productId, quantity };
    const cart = await cartRepository.addProductsToCart(data);
    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Product Added to Cart Successfully",
      data: { cart },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

const removeProductToCart = async (req, res) => {
  try {
    await cartRepository.removeCartProductByProductIdAndUserId(
      req.body.productId,
      req.user._id
    );
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

export default { addProductsToCart, removeProductToCart };
