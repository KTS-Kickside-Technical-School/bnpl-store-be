import express from "express"
import httpStatus from "http-status"

import authRouter from "./authRouter.js"

const router = express.Router()

router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, message: "Welcome to our backend APIs" })
})

router.use('/auth', authRouter)



export default router