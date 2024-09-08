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

const updateBlogById = async (_id, updateBlogData) => {
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error("Invalid Blog ID");
    }

    const blogUpdated = await Blog.findByIdAndUpdate(_id, updateBlogData, { new: true });
    return blogUpdated;
};


const deleteBlogById = async(_id)=>{
    const blogDeleted = await Blog.findByIdAndDelete(_id);
    return blogDeleted;
}

export default { 
    createBlog,
    getBlogByAttributes,
    updateBlogById,
    deleteBlogById

}