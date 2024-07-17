import httpStatus from "http-status";
import {
  hashPassword, generateToken,
  generateOTP
} from "../../../helpers/authHelpers.js";
import { sendEmail } from "../../../services/mailSend.js";
import authRepository from "../repository/authRepository.js";
import nodemailer from 'nodemailer';

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


const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false, 
  auth: {
    user: 'username',
    pass: 'password'
  }
});

const resetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = resetPasswordSchema.validate({ email });
    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = await user.generateResetPasswordToken();
    await user.save();
    const mailOptions = {
      from: 'bnpltestingreset@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click on this link to reset your password: http://localhost:5000/new-password/${token}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending password reset token' });
      }
      res.json({ message: 'Password reset token sent to your email' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending password reset token' });
  }
};

const newPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;
    const user = await User.findOne({ passwordResetToken: token });
    if (!user) {
      return res.status(404).json({ message: 'Invalid token' });
    }
    const result = newPasswordSchema.validate({ password, confirmPassword });
    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }
    user.password = password;
    user.passwordResetToken = null;
    await user.save();
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
};

export default { registerUser, loginUser, resetpassword, newPassword };
