import httpStatus from "http-status";
import cartRepository from "../repository/cartRepository.js";



const addProductToCart = async (req, res) => {
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
        const data = { userId, productId, quantity }

        const cart = await cartRepository.addProductToCart(data);
        return res.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            message: "Product added Successfully to Cart",
            data: { cart }
        })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message:error
        });

    }
};


const removeProductFromCart = async (req, res) => {
    try {
        await cartRepository.deleteProductFromCart(req.product._id, req.user._id)

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

const getCartItems = (req, res) => {
    try {
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Cart Items retrieved successfully",
            data: { cartItems: req.cartItems }
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            messager: error.message
        })
    }
}

export default {
    addProductToCart,
    removeProductFromCart,
    getCartItems
}