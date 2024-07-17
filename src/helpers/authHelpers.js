import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config()
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

const generateToken = async (userId) => {
    const secretKey = process.env.SECRET_KEY
    return await jwt.sign({ userId }, secretKey)
}

const generateOTP = (userId) => {
    const timestamp = Date.now().toString();

    const data = `${userId}:${timestamp}`;

    const hash = crypto.createHash('sha256').update(data).digest('hex');

    const otp = hash.slice(0, 8).toUpperCase();

    return otp;
};
export {
    hashPassword,
    generateToken,
    generateOTP
}