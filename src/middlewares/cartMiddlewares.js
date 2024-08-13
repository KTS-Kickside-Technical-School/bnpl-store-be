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
