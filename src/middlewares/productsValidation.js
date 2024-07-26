import httpStatus from "http-status";
import productRepository from "../modules/product/repository/productRepository.js";

export const isProductAlreadyExists = async (req, res, next) => {
  try {
    const product = await productRepository.getProductByAttribute(
      "name",
      req.body.name
    );
    if (product) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: "product already exists",
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

export const isProductsExists = async (req, res, next) => {
  try {
    const products = await productRepository.getAllProducts();
    if (!products.length) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ status: httpStatus.NOT_FOUND, message: "No products found" });
    }
    req.products = products;
    next();
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

export const isProductExists = async (req, res, next) => {
  try {
    const productId = req.params.id || req.body.productId;
    if (!productId) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({
          status: httpStatus.BAD_REQUEST,
          message: "Invalid Product ID",
        });
    }
    const product = await productRepository.getProductByAttribute(
      "_id",
      productId
    );
    if (!product) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ status: httpStatus.NOT_FOUND, message: "Product not found" });
    }
    req.product = product;
    next();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

export const isCategoryAlreadyExists = async (req, res, next) => {
  try {
    const category = await productRepository.getCategoryByAttribute(
      "name",
      req.body.name
    );
    if (category) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: "category already exists",
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

export const isCategoriesExists = async (req, res, next) => {
  try {
    const category = await productRepository.getAllCategories();
    if (!category.length) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ status: httpStatus.NOT_FOUND, message: "No categories found" });
    }
    req.categories = category;
    next();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};
export const isCategoryExistByCategory = async (req, res, next) => {
  try {
    const category = await productRepository.getCategoryByAttribute(
      "name",
      req.body.category
    );
    if (!category) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ status: httpStatus.NOT_FOUND, message: "Category not found" });
    }
    req.category = category;
    next();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};
