import Blog from "../../../databases/models/blogs.js";
import mongoose from "mongoose";

const createBlog = async(data) =>{
    const newBlog = new Blog(data);
    return await newBlog.save()
}
const getBlogByAttributes = async(key, title) =>{
    const query = {}
    query[key] = title;
    return Blog.findOne(query)
}

const blogUpdate = async(_id, updateBlogData)=>{
    
    const updatedBlogData = await Blog.findByIdAndUpdate(_id, updateBlogData, {new: true})
    return updatedBlogData
}

const deleteBlogById = async(_id)=>{
    const blogDeleted = await Blog.findByIdAndDelete(_id);
    return blogDeleted;
}

export default { 
    createBlog,
    getBlogByAttributes,
    blogUpdate,
    deleteBlogById

}