import express from "express";
import { isTermsAlreadyExist } from "../middlewares/termsMiddlewares.js";
import { newTermsSchema
 } from "../modules/terms/validation/termsValidation.js";
import termsController from "../modules/terms/controller/termsController.js";
import { isUserAuthorized } from "../middlewares/userAuthorization.js";
import { bodyValidation } from "../middlewares/validations.js";

 const router = express.Router()


 router.post(
    "/create-terms",
    isUserAuthorized(["admin"]),
    bodyValidation(newTermsSchema),
    isTermsAlreadyExist,
    termsController.adminCreateTerms
)

export default router