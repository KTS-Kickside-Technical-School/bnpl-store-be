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
            message: error
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

// const userPayCart = (req, res) => {
//     try {
//         console.log(req.cartItems)
//     } catch (error) {
//         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             status: httpStatus.INTERNAL_SERVER_ERROR,
//             messager: error.message
//         })
//     }
// }

const userCreateStripeProduct = async (req, res) => {
    try {
        const cartItems = req.cartItems;

        const productsName = cartItems.map(item => item.productId.name).join(", ");
        const productsDescription = cartItems.map(item => item.productId.description).join(", ");

        req.body.productInfo.name = productsName;
        req.body.productInfo.active = true;
        req.body.productInfo.description = productsDescription;
        req.body.productInfo.images = cartItems.map(item => item.productId.image);
        req.body.productInfo.default_price_data.currency = "rwf";

        const product = await cartRepository.createStripeProduct(req.body.productInfo);

        return res.status(httpStatus.CREATED).json({ message: "Stripe product created successfully.", data: { product } });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            error: error.message
        });
    }
};

export const userStripeCheckoutSession = async (req, res) => {
    try {
        let customer = await cartRepository.findStripeCustomerByAttribute("email", req.user.email);
        if (!customer) customer = await cartRepository.createStripeCustomer({ email: req.user.email });

        req.body.sessionInfo.customer = customer.id;
        req.body.sessionInfo.mode = "payment"
        req.body.sessionInfo.ui_mode = "hosted"
        req.body.sessionInfo.payment_method_types = ["card"]

        const session = await cartRepository.createStripeSession(req.body.sessionInfo);

        return res.status(httpStatus.CREATED).json({ message: "Stripe session created successfully.", data: { session } });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error: error.message })
    }
};

export default {
    addProductToCart,
    removeProductFromCart,
    getCartItems,
    // userPayCart,
    userCreateStripeProduct,
    userStripeCheckoutSession
}