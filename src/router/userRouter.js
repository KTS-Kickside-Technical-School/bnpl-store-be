import express from "express"
import { isUserAuthorized } from "../middlewares/userAuthorization.js";
import { userUpdateProfile, userViewProfile } from "../modules/user/controller/userController.js";
import { bodyValidation } from "../middlewares/validations.js";
import { updateUserSchema } from "../modules/user/validations/userValidations.js";
const router = express.Router()


router.put("/user-update-profile",isUserAuthorized(['customer', 'admin']),bodyValidation(updateUserSchema), userUpdateProfile);
router.get("/user-view-profile",isUserAuthorized(['customer', 'admin']),userViewProfile)
export default router