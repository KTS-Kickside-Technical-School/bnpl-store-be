import express from 'express';
import upload from "../helpers/multer.js";
import { bodyValidation, transformFilesToBody, isIdValid } from '../middlewares/validations.js';
import {
    createProductsSchema,
    createCategorySchema
} from '../modules/product/validations/productsValidations.js';
import {
    isProductAlreadyExists,
    isProductsExists,
    isProductExists,
    isCategoryAlreadyExists
} from '../middlewares/productsValidation.js';
import productController from '../modules/product/controller/productController.js';
import { isUserAuthorized } from '../middlewares/userAuthorization.js';
const router = express.Router();

router.post("/create-product", isUserAuthorized(['admin']), upload.array("images"), transformFilesToBody, bodyValidation(createProductsSchema), isProductAlreadyExists, productController.adminCreateProduct)
router.get("/view-all-products", isProductsExists, productController.getAllProducts)
router.get("/view-specific-product/:id", isIdValid, isProductExists, productController.getSingleProduct)


router.post("/create-category", bodyValidation(createCategorySchema), isCategoryAlreadyExists, productController.adminCreateCategory)
export default router