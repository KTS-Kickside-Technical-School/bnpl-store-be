import mongoose from "mongoose";
import httpStatus from "http-status";
import blogRepository from "../modules/blog/repository/blogRepository.js";



export const isBlogAlreadyExist = async (req, res, next) =>{
    try {
        const blog = await blogRepository.getBlogByAttributes(
            "title",
            req.body.title
        );

        if (blog) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: "Blog Already Exist"
            });
        }

        next();
        
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })

        
    }


}