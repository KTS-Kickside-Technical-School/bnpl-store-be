import httpStatus from "http-status";
import authRepository from "../modules/auth/repository/authRepository.js";
import { verifyToken } from "../helpers/authHelpers.js";

export const isUserAuthorized = function (role) {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, message: "No token provided" });
            }
            const token = authHeader.split(' ')[1];
            const decoded = verifyToken(token);
            if (!decoded) {
                return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, message: "Invalid token" });
            }
            const session = await authRepository.getSessionByAttributes("userId", decoded.userId, "token", token);
            if (!session) {
                return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, message: "Unauthorized access" });
            }
            const user = await authRepository.getUserByAttribute("_id", decoded.userId);
            if (!user) {
                return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, message: "Unauthorized access" });
            }
            if (!role.includes(user.role)) {
                return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, message: "Unauthorized access" });
            }
            req.user = user;
            return next();
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
        }
    }
}
