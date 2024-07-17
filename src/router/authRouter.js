import express from "express";
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resetPasswordSchema,
  newPasswordSchema,
} from "../modules/auth/validation/authValidations.js";
import {
  bodyValidation,
  isUserAlreadyExist,
  isUserExist,
  iTokenExists,
} from "../middlewares/validations.js";
import authController from "../modules/auth/controller/authController.js";

const router = express.Router();

router.post(
  "/register",
  bodyValidation(registerSchema),
  isUserAlreadyExist,
  authController.registerUser
);
router.post(
  "/verify-email",
  bodyValidation(verifyEmailSchema),
  isUserExist,
  iTokenExists,
  authController.verifyEmail
);

router.post(
  "/login",
  bodyValidation(loginSchema),
  isUserExist,
  authController.loginUser
);

router.post(
  "/reset-password",
  bodyValidation(resetPasswordSchema),
  isUserExist,
  authController.userSendOtp
);
router.post(
  "/new-password/",
  bodyValidation(newPasswordSchema),
  isUserExist,
  iTokenExists,
  authController.newPassword
);

export default router;
