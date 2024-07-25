import httpStatus from "http-status";
import cartRepository from "../repository/cartRepository.js";


const addProductsToCart = async (req, res) => {
  try {
    const {userId,productId,quantity}=req.body
    const data = { userId, productId, quantity };
    console.log(data)
    const cart = await cartRepository.addProductsToCart(data);
    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Product Added to Cart Successfully",
      data: { cart },
    });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
  }
};


const removeProductToCart = async (req, res) => {
  try {
    await cartRepository.deleteCartProduct(
      req.cart.id,
      req.product.productId
    );
    res
      .status(httpStatus.OK)
      .json({ status: httpStatus.OK, message: " product removed to cart successfully" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};




export default {addProductsToCart,removeProductToCart}