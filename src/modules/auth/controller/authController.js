import httpStatus from "http-status";
import {
    hashPassword,
    generateToken
}
    from "../../../helpers/authHelpers.js";
import { sendEmail } from "../../../services/mailSend.js";
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
        await sendEmail(email, "Registration successful", `Your registration was successful. Click this link to verify your account: ${process.env.FRONTEND_URL}/api/v1/auth/verify/${token}`)
        return res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: "User registered successfully", data: { newUser, session } })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
    }
}


export default { registerUser }