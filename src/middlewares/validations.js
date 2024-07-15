import httpStatus from "http-status";
import authRepository from "../modules/auth/repository/authRepository.js";
const bodyValidation = (schema) => async (req, res, next) => {
    try {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            throw new Error(
                error.details
                    .map((detail) => detail.message.replace(/"/g, ""))
                    .join(", ")
            );
        }
        return next();
    } catch (error) {
        res
            .status(httpStatus.BAD_REQUEST)
            .json({ status: httpStatus.BAD_REQUEST, message: error.message });
    }
};

const isUserAlreadyExist = async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = await authRepository.getUserByAttribute('email', email);
        if (user) {
            return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: "User already exists" })
        }
        return next()
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
    }

}

export { bodyValidation, isUserAlreadyExist };