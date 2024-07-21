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

export default { adminCreateProduct }