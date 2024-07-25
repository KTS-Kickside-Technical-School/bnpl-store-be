import httpStatus from "http-status";
import cartRepository from "../modules/cart/repository/cartRepository.js";

export const isProductalreadyInCart = async (req, res, next) => {
  try {
    const { productId, userId, quantity } = req.body;
    const updatedData = { productId, userId, quantity };
    const existingCart = await cartRepository.getCartByAttributes(
      "productId",
      productId,
      "userId",
      userId
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
export const isCartIdExist = async(req,res,next) =>{
    const {cartId,userId} = req.body;
    console.log(cartId)
    if (!cartId) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: "Cart ID is required."
      });
    }
    const cart = await cartRepository.getCartByAttributes( "cartId",
      cartId,
      "userId",
      userId);
    if (!cart) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "Cart not found. Please add items to your cart."
      });
    }
    req.cart = cart;
    return next();
  };

  
 export const isCartProductExist = async (
  req,
  res,
  next
) => {
  try {
    const product = await cartRepository.getProductByCartIdAndProductId(
      req.cart._id,
      req.body.productId
    );
    if (!product)
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "Product not found.",
      });
    req.product = product;
    return next();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};
