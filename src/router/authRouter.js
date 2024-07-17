import express from "express";
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resetPasswordSchema,
  newPasswordSchema,
  logoutSchema,
} from "../modules/auth/validation/authValidations.js";
import {
  bodyValidation,
  isUserAlreadyExist,
  isUserExist,
  isOtpExists,
  isTokenValid,
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
  isOtpExists,
  authController.verifyEmail
);

router.post(
  "/login",
  bodyValidation(loginSchema),
  isUserExist,
  authController.loginUser
);

router.post(
  "/forgot-password",
  bodyValidation(resetPasswordSchema),
  isUserExist,
  authController.userSendOtp
);
router.post(
  "/new-password/",
  bodyValidation(newPasswordSchema),
  isUserExist,
  isOtpExists,
  authController.newPassword
);

router.post(
  "/logout",
  bodyValidation(logoutSchema),
  isUserExist,
  isTokenValid,
  authController.userLogout
);
export default router;
