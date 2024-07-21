import express from 'express';
import upload from "../helpers/multer.js";
import { bodyValidation, transformFilesToBody } from '../middlewares/validations.js';
import { createProductsSchema } from '../modules/product/validations/productsValidations.js';
import { isProductExist } from '../middlewares/productsValidation.js';
import productController from '../modules/product/controller/productController.js';

const router = express.Router();

router.post("/create-product",upload.array("images"),transformFilesToBody,bodyValidation(createProductsSchema),isProductExist,productController.adminCreateProduct)

export default router