import express from 'express';
import upload from "../helpers/multer.js";
import { bodyValidation, transformFilesToBody } from '../middlewares/validations.js';
import { createProductsSchema } from '../modules/product/validations/productsValidations.js';
import { isProductAlreadyExists, isProductsExists } from '../middlewares/productsValidation.js';
import productController from '../modules/product/controller/productController.js';
import { isUserAuthorized } from '../middlewares/userAuthorization.js';
const router = express.Router();

router.post("/create-product", isUserAuthorized(['admin']), upload.array("images"), transformFilesToBody, bodyValidation(createProductsSchema), isProductAlreadyExists, productController.adminCreateProduct)
router.get("/view-all-products", isProductsExists, productController.getAllProducts)
export default router