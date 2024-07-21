import httpStatus from "http-status";
import userRepository from "../repository/userRepository.js";

export const userUpdateProfile = async (req, res) => {
    try {
        const updatedData = req.body;
        const updatedUser = await userRepository.updateUser({ _id: req.user._id }, updatedData);

        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Account updated successfully",
            data: { updatedUser }
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
}

export const userViewProfile = async (req, res) => {
    try {
        const userProfile = await userRepository.getProfileByAttribute("_id",req.user._id);
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "User profile fetched successfully",
            data: { userProfile }
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:httpStatus.INTERNAL_SERVER_ERROR, message:error.message});
    }
}
