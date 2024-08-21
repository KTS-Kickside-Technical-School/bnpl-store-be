import httpStatus from "http-status";
import cartRepository from "../modules/cart/repository/cartRepository.js"

export const isProductAlreadyToCart = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const productId = req.product._id;
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
            message: "Product Quantity Updated Successfully",
            data: {cart: updatedCartItem }
        });


      } 
   
            
     return  next();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  };