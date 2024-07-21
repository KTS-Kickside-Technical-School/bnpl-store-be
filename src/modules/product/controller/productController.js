import httpStatus from "http-status"
import productRepository from "../repository/productRepository.js";
import uploadImages from "../../../helpers/uploadImages.js";
const adminCreateProduct = async (req, res) => {
    try {
        const uploadPromises = req.files.map((file) => uploadImages(file));
        const images = await Promise.all(uploadPromises);
        const productData = {
            ...req.body,
            images: images.map((image) => image.secure_url)
        }

        const product = await productRepository.createProduct(productData);
        return res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: "Product created successfully", data: { product } });

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = req.products
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK, message: "Products retrieved successfully",
            data: { products }
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const product = req.product
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK, message: "Product retrieved successfully",
            data: { product }
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
    }
}

const adminCreateCategory = async (req, res) => {
    try {
        const category = await productRepository.createCategory(req.body)
        return res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: "Category created successfully", data: { category } });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
    }
}
export default {
    adminCreateProduct,
    getAllProducts,
    getSingleProduct,
    adminCreateCategory
}