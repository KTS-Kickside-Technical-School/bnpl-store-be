import express from "express";
import { registerSchema, loginSchema,
  verifyEmailSchema
 } from "../modules/auth/validation/authValidations.js";
import {
  bodyValidation,
  isUserAlreadyExist,
  isUserExist,
  iTokenExists
} from "../middlewares/validations.js";
import authController from "../modules/auth/controller/authController.js";

const router = express.Router();

router.post("/register",bodyValidation(registerSchema),isUserAlreadyExist,authController.registerUser)
router.post("/verify-email",bodyValidation(verifyEmailSchema),isUserExist,iTokenExists,authController.verifyEmail)

router.post("/login", bodyValidation(loginSchema), isUserExist,authController.loginUser);
export default router