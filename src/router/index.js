import express from "express"
import httpStatus from "http-status"

const router = express.Router()

router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({status: httpStatus.OK,message: "Welcome to API"})
})



export default router