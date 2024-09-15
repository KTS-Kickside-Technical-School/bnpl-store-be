import express from 'express';
import upload from "../helpers/multer.js";
import { bodyValidation, transformFilesToBody, isIdValid } from '../middlewares/validations.js';
import {
    createProductsSchema,
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
    deleteProductSchema
} from '../modules/product/validations/productsValidations.js';
import {
    isProductAlreadyExists,
    isProductsExists,
    isProductExists,
    isCategoryAlreadyExists,
    isCategoriesExists,
    isCategoryExistByCategory,
    isCustomerProductsExists
} from '../middlewares/productsValidation.js';
import productController from '../modules/product/controller/productController.js';
import { isUserAuthorized } from '../middlewares/userAuthorization.js';
const router = express.Router();

router.post("/create-product",isUserAuthorized(['admin']),  upload.array('images'), transformFilesToBody, bodyValidation(createProductsSchema), isProductAlreadyExists,isCategoryExistByCategory, productController.adminCreateProduct)
router.get("/customer-view-products", isCustomerProductsExists, productController.getAllProducts)
router.get("/view-all-products", isProductsExists, productController.getAllProducts)
router.get("/view-specific-product/:id", isIdValid, isProductExists, productController.getSingleProduct)
router.delete("/delete-product", isUserAuthorized(['admin']), isProductExists, bodyValidation(deleteProductSchema),productController.adminDeleteProduct)


router.post("/create-category", isUserAuthorized(['admin']), bodyValidation(createCategorySchema), isCategoryAlreadyExists, productController.adminCreateCategory)
router.get("/view-categories", isCategoriesExists, productController.adminViewCategories)

router.put("/update-category", isUserAuthorized(['admin']), isCategoriesExists, bodyValidation(updateCategorySchema), productController.adminUpdateCategory)
router.delete("/Delete-category", isUserAuthorized(['admin']), isCategoriesExists, bodyValidation(deleteCategorySchema), productController.adminDeleteCategory)

export default router