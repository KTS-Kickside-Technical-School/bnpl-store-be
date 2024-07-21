import httpStatus from "http-status";
import productRepository from "../modules/product/repository/productRepository.js"

export const isProductExist = async (req, res, next) => {
    try {
        const product = await productRepository.getProductByAttribute("name", req.body.name);
        if (product) {
            return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: "product already exists" })
        }
        next();
    }
    catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
    }
}