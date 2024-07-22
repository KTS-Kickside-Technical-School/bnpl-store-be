import express from "express"
import httpStatus from "http-status"

import authRouter from "./authRouter.js"
import userRouter from "./userRouter.js"
import productRouter from "./productsRouter.js"
import cartRouter from "./cartRouter.js"

const router = express.Router()

router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, message: "Welcome to our backend APIs" })
})

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/cart',cartRouter)



export default router