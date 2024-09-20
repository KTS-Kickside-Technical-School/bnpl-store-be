import httpStatus from "http-status";
import cartRepository from "../modules/cart/repository/cartRepository.js"
import Product from "../databases/models/product.js";


export const isProductAlreadyToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const existingCartItem = await cartRepository.getCartByAttributes(
      "productId",
      productId,
      "userId",
      userId,
    );
    if (existingCartItem) {
      const updatedCartItem = await cartRepository.updateCartQuantity(existingCartItem._id, quantity)
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Cart quantity updated successfully",
        data: { cart: updatedCartItem }
      });


    }


    return next();
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

export const isProductExistsToCart = async (req, res, next) => {
  const productId = req.body.productId || req.query.productId || req.params.productId;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message: "Product not found",
    });
  }
  req.product = product;
  next();
};

export const isCartProductsExists = async (req, res, next) => {
  try {
    const cartItems = await cartRepository.findCartItemsByUserId(req.user._id);
    if (!cartItems || cartItems.length < 1) {
      return res.json({
        status: httpStatus.NOT_FOUND,
        message: "Cart is empty"
      })
    }
    req.cartItems = cartItems;
    return next();
  } catch (error) {
    return res.status(httpStatus.OK).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    })
  }
}