import express from "express"
import { isUserAuthorized } from "../middlewares/userAuthorization.js";
import { userUpdateProfile } from "../modules/user/controller/userController.js";
import { bodyValidation } from "../middlewares/validations.js";
import { updateUserSchema } from "../modules/user/validations/userValidations.js";
const router = express.Router()


router.put("/user-update-profile", bodyValidation(updateUserSchema), isUserAuthorized(['customer', 'admin']), userUpdateProfile);

export default router