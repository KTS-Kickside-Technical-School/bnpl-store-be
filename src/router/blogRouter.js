import express from "express";
import { isUserAuthorized } from "../middlewares/userAuthorization.js";
import { bodyValidation, transformFilesToBody } from "../middlewares/validations.js";
import { createBlogSchema, deleteBlogSchema, updateBlogSchema } from "../modules/blog/vadation/blogValidation.js";
import { isBlogAlreadyExist } from "../middlewares/blogMiddlewares.js";
import blogController from "../modules/blog/controller/blogController.js";
import upload from "../helpers/multer.js"


const router = express.Router();

router.post( 
    "/create-blog", 
    isUserAuthorized(["admin"]),
    upload.array('images'), 
    transformFilesToBody,
    bodyValidation(createBlogSchema),
    isBlogAlreadyExist,
    blogController.adminCreateBlog
);

router.put("/update-blog/:id",
    isUserAuthorized(['admin']),
    transformFilesToBody,
    bodyValidation(updateBlogSchema),
    isBlogAlreadyExist,
    blogController.updateBlog
);

router.delete("/delete-blog",
    isUserAuthorized(['admin']),
    bodyValidation(deleteBlogSchema),
    blogController.deleteBlog
)


export default router