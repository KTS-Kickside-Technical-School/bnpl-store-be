import httpStatus from "http-status";
import cartRepository from "../modules/cart/repository/cartRepository.js";

export const isProductalreadyInCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const updatedData = { productId, userId, quantity };
    const existingCart = await cartRepository.getCartByAttributes(
      "productId",
      productId,
      "userId",
      req.user._id
    );
    if (existingCart) {
      const updatedCart = await cartRepository.updateCartByAttributes(
        { _id: existingCart._id },
        updatedData
      );
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Cart updated succefully",
        data: { updatedCart },
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
// export const isCartIdExist = async (req, res, next) => {
//   const { cartId } = req.body;
//   console.log(cartId);
//   if (!cartId) {
//     return res.status(httpStatus.BAD_REQUEST).json({
//       status: httpStatus.BAD_REQUEST,
//       message: "Cart ID is required.",
//     });
//   }
//   const cart = await cartRepository.getCartByAttributes(
//     "cartId",
//     cartId,
//     "userId",
//     req.user._id
//   );
//   if (!cart) {
//     return res.status(httpStatus.NOT_FOUND).json({
//       status: httpStatus.NOT_FOUND,
//       message: "Cart not found. Please add items to your cart.",
//     });
//   }
//   req.cart = cart;
//   return next();
// };

export const isProductInCart = async (req, res, next) => {
  try {
    const cartProduct = await cartRepository.getCartByProductIdAndUserId(
      req.body.productId,
      req.user._id
    );
    console.log("pro",req.body.productId,"User",req.user._id)
    if (!cartProduct)
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "Product not found in cart.",
      });
    req.cartProduct = cartProduct;
    return next();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};
