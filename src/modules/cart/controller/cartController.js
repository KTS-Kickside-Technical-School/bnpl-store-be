import httpStatus from "http-status";
import cartRepository from "../repository/cartRepository.js";

export const addProductToCart = async(req, res)=>{
    try {
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
export default{addProductToCart}