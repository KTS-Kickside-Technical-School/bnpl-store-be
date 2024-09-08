import httpStatus from "http-status";
import blogRepository from '../repository/blogRepository.js'
import uploadImage from "../../../helpers/uploadImages.js";

const adminCreateBlog = async (req, res) =>{
    try {
        const uploadPromises = req.files.map((file) => uploadImage(file))
        const images = await Promise.all(uploadPromises)
        const blogData = {
            ...req.body,
            images: images.map((image) => image.secure_url)
        };

        const blog = await blogRepository.createBlog(blogData);
        return res.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            message: "Blog Created Successfull",
            data: {blog}
        })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
        
    }
};


const updateBlog = async(req, res)=>{
    
    try {
        const {id} = req.params;
        const updateBlogData = req.body
        if (!id){
            return res.status(httpStatus.BAD_REQUEST).json({
              status: httpStatus.BAD_REQUEST,
              message: "BlogID is required"
            })
          }

        const updatedBlog = await blogRepository.updateBlogById(id, updateBlogData)
        if (!updatedBlog){
            return res.status(httpStatus.NOT_FOUND).json({
              status: httpStatus.NOT_FOUND,
              message: "Blog Not Found"
            })
          }
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Blog Updated Successfully",
            data: updatedBlog,
            
        })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
};

const deleteBlog = async(req, res)=>{
    try {
        const blogId = req.body.blogId;
        const deletedBlog = blogRepository.deleteBlogById(
            blogId
        )
        if (!deletedBlog) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "BLOG NOT FOUND"
            })
        }
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Blog Deleted Successfully",
            data: deletedBlog
        })
        
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
        
    }
}

export default{ 
    adminCreateBlog,
    updateBlog,
    deleteBlog

 }