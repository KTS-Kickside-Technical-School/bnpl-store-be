import httpStatus from "http-status";
import {
  hashPassword, generateToken,
  generateOTP
} from "../../../helpers/authHelpers.js";
import { sendEmail } from "../../../services/mailSend.js";
import authRepository from "../repository/authRepository.js";
const registerUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = await hashPassword(req.body.password);
    const user = { email, password };
    const newUser = await authRepository.createUser(user);
    const otp = generateOTP(newUser._id);

    const session = {
      userId: newUser._id,
      token: otp,
    };
    const newSession = await authRepository.saveSession(session);

    const welomeMessage = await sendEmail(
      email,
      "Registration successful",
      `Your registration was successful. Click use below OTP to verify your account: ${otp}`
    );
    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "User registered successfully",
      data: { newUser, newSession },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const verifyEmail = await authRepository.updateUserByAttribute("_id", req.user._id, "isEmailVerified", true);
    const deleteSession = await authRepository.destroySessionByAttributes("userId", req.user._id, "token", req.session.token)
    const email = req.user.email
    const verificationMessage = await sendEmail(email, "Email Verification Successful", `Thank you for verifying your email.`)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: " Email verified successfully.", data: { verifyEmail, deleteSession } })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
  }
}
const loginUser = async (req, res) => {
  try {
    const token = await generateToken(req.userId);
    const session = {
      userId: req.userId,
      token: token,
    };
    const newSession = await authRepository.saveSession(session);
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Logged Sucessfully",
      data: { newSession },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

export default { registerUser, loginUser, verifyEmail };
