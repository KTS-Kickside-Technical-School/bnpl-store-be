import httpStatus from "http-status";
import cartRepository from "../repository/cartRepository.js";


export const addProductsToCart = async(req, res)=>{
    try {

        const { user, product } = req;
        if (!user || !user._id || !product || !product._id) {
          return res.status(httpStatus.BAD_REQUEST).json({
            status: httpStatus.BAD_REQUEST,
            message: "User or product information is missing",
          });
        }

        const userId = req.user._id;
        const productId = req.product._id;
        const quantity = req.body.quantity;
        const data = {userId, productId, quantity}
        
        const cart= await cartRepository.addProductToCart(data);
        return res.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            message: "Product added Successfully to Cart",
            data: {cart}
        })
        
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Error adding product to cart",
        });
        
    }
};


export const removeProductFromCart = async (req, res)=>{
    try {

        const userId = req.user._id
        const productId = req.body.productId
        const removeCartItems= await cartRepository.deleteProductFromCart(userId, cartId, productId)

        if (!removeCartItems){
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "Product not found in cart",
            })
        }
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Product removed from cart successfully",
        })


        
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
        
    }
};

export const removeAllProductFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const result = await cartRepository.deleteAllProductFromCart(userId);

        if (result.deletedCount === 0) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "No products found in cart",
            });
        }

        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "All products removed from cart successfully",
        });

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message 
        });
    }
};



export default{
    addProductsToCart,
    removeProductFromCart,
    removeAllProductFromCart

}