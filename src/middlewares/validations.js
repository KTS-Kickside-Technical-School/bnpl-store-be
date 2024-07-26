import httpStatus from "http-status";
import authRepository from "../modules/auth/repository/authRepository.js";
// import { verifyToken } from "../helpers/authHelpers.js";
import mongoose from "mongoose";


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
    const user = await authRepository.getUserByAttribute("email", email);
    if (user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({
          status: httpStatus.BAD_REQUEST,
          message: "User already exists",
        });
    }
    return next();
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
  }
};
const isUserExist = async (req, res, next) => {
  try {
    let user = undefined;

    const email = req.body.email;
    if (email) {
      user = await authRepository.getUserByAttribute("email", email);
    }

    if (req.body.userId) {
      if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: httpStatus.BAD_REQUEST,
          message: "Invalid User ID",
        });
      }
      user = await authRepository.getUserByAttribute("_id", req.body.userId);
    }

    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: "User Doesn't exist",
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

const isOtpExists = async (req, res, next) => {
  try {
    const session = await authRepository.getSessionByAttributes(
      "userId",
      req.user._id,
      "token",
      req.body.otp
    );
    if (!session) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: httpStatus.BAD_REQUEST, message: "Invalid OTP" });
    }
    req.session = session;
    return next();
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
  }
};
const isTokenValid = async (req, res, next) => {
  try {
    const session = await authRepository.getSessionByAttributes(
      "userId",
      req.body.userId,
      "token",
      req.body.token
    );
    if (!session) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: httpStatus.BAD_REQUEST, message: "Invalid Token" });
    }
    req.session = session;
    return next();
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
  }
};

const transformFilesToBody = (req, res, next) => {
  if (!req.files) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: httpStatus.BAD_REQUEST, message: "Images are required" });
  }

  const files = req.files;
  req.body.images = files.map((file) => file.path);
  next();
};

const isIdValid = (req, res, next) =>{
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: "Invalid ID",
    });
  }
  next();
}


export {
  bodyValidation,
  isUserAlreadyExist,
  isUserExist,
  isOtpExists,
  isTokenValid,
  transformFilesToBody,
  isIdValid
};
