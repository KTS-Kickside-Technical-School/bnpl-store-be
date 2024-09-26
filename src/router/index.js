import express from "express"
import httpStatus from "http-status"

import authRouter from "./authRouter.js"
import userRouter from "./userRouter.js"
import productRouter from "./productsRouter.js"
import wishlistRouter from "./wishlistRouter.js"
import supplierRouter from "./supplierRouter.js"
import cartRouter from "./cartRouter.js"
import blogRouter from './blogRouter.js'
import termsRouter from "./termsRouter.js"

const router = express.Router()

router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, message: "Welcome to our backend APIs" })
})

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/wishlist', wishlistRouter)
router.use('/supplier', supplierRouter )
router.use('/cart', cartRouter)
router.use('/blog', blogRouter)
router.use('/terms', termsRouter)



export default router