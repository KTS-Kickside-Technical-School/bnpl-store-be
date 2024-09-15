import httpStatus from "http-status";
import productRepository from "../repository/productRepository.js";
import uploadImages from "../../../helpers/uploadImages.js";

const adminCreateProduct = async (req, res) => {
  try {

    const uploadPromises = req.files.map((file) => uploadImages(file));

    if (uploadPromises.length === 0) {
      throw new Error("No upload promises generated");
    }

    const images = await Promise.all(uploadPromises);

    if (!images || images.length === 0) {
      throw new Error("Image upload failed");
    }

    const productData = {
      ...req.body,
      images: images.map((image) => image.secure_url),
    };

    const product = await productRepository.createProduct(productData);

    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Product created successfully",
      data: { product }
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message || "An error occurred while creating the product",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = req.products;
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Products retrieved successfully",
      data: { products },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = req.product;
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Product retrieved successfully",
      data: { product },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

const adminDeleteProduct = async (req, res) => {
  try {

    const productId = req.body.productId
    const product = await productRepository.deleteProduct(productId)
    if (!product) {
      res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "Product not Found"
      })
    }
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Product deleted successfully",
      data: product
    })

  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    })
  }
}

const adminCreateCategory = async (req, res) => {
  try {
    const category = await productRepository.createCategory(req.body);
    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Category created successfully",
      data: { category },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};
const adminViewCategories = async (req, res) => {
  try {
    const categories = req.categories;
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Category retrieved successfully",
      data: { categories },
    });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err.message });
  }
};

const adminUpdateCategory = async (req, res) => {
  try {
    const categoryId = req.body.categoryId;
    const updatedCategory = await productRepository.updateCategory(categoryId, req.body)
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Category updated successfully",
      data: updatedCategory
    })

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    })

  }
};

const adminDeleteCategory = async (req, res) => {
  try {
    const categoryId = req.body.categoryId;
    const deletedCategory = await productRepository.deleteCategory(categoryId)
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Category deleted successfully",
      data: deletedCategory
    })

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    })

  }
};

export default {
  adminCreateProduct,
  getAllProducts,
  getSingleProduct,
  adminCreateCategory,
  adminViewCategories,
  adminUpdateCategory,
  adminDeleteCategory,
  adminDeleteProduct,
}
