import express from "express";
import { bodyValidation, isIdValid } from '../middlewares/validations.js';
import { supplierSchema, updateSupplierSchema } from "../modules/supplier/validation/supplierVadation.js";
import { IsSupplierAlreadyExist } from "../middlewares/supplierMiddlewares.js";
import supplierController from "../modules/supplier/controller/supplierController.js";
import { isUserAuthorized } from "../middlewares/userAuthorization.js";

const router = express.Router();

router.post("/create-supplier", isUserAuthorized(['admin']), bodyValidation(supplierSchema), IsSupplierAlreadyExist,supplierController.adminCreateSupplier );
router.get("/get-all-suppliers", isUserAuthorized(['admin']), supplierController.getAllSupplier);
router.get("/get-supplier/:id", isUserAuthorized(['admin']), supplierController.getSupplierById);
router.delete("/delete-supplier/:id",isUserAuthorized(['admin']), supplierController.deleteSupplier );
router.put("/update-supplier/:id", isUserAuthorized(['admin']), bodyValidation(updateSupplierSchema), supplierController.updateSupplier )

export default router