import httpStatus from "http-status";
import {
    hashPassword,
    generateToken
}
    from "../../../helpers/authHelpers.js";
import authRepository from "../repository/authRepository.js";
const registerUser = async (req, res) => {
    try {
        const email = req.body.email
        const password = await hashPassword(req.body.password)
        const user = { email, password }
        const newUser = await authRepository.createUser(user)
        const token = await generateToken(newUser._id)
        const session = {
            userId: newUser._id,
            token
        }
        return res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: "User registered successfully", data: { newUser,session } })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
    }
}


export default { registerUser }