import express from "express";
import { registerSchema } from "../modules/auth/validation/authValidations.js";
import {bodyValidation,isUserAlreadyExist} from "../middlewares/validations.js";
import authController from "../modules/auth/controller/authController.js";

const router = express.Router();

router.post("/register",bodyValidation(registerSchema),isUserAlreadyExist,authController.registerUser)
export default router