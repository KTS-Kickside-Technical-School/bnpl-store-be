import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

const generateToken = async (userId) => {
    const secretKey = process.env.SECRET_KEY
    return await jwt.sign({userId}, secretKey)
}

export {
    hashPassword,
    generateToken
}