import Product from "../../../databases/models/product.js";
import Category from "../../../databases/models/category.js";

const getProductByAttribute = async (key, value) => {
    const query = {}
    query[key] = value;
    return Product.findOne(query)
}

const createProduct = async (data) => {
    const newProduct = new Product(data);
    return await newProduct.save();
}

const getAllProducts = async () => {
    return Product.find().sort({ createdAt: -1 });
};

const getCategoryByAttribute = async (key, name) => {
    const query = {}
    query[key] = name;
    return Category.findOne(query)
}
const createCategory = async (category) => {
    const newCategory = new Category(category);
    return await newCategory.save();
}

const getAllCategories = async () => {
    return Category.find()
}

const updateCategory = async (_id, updateCategoryData) =>{
    const category = await Category.findByIdAndUpdate(_id, updateCategoryData, {new: true})
    return category;
}

const deleteCategory = async (_id) =>{
    const category = await Category.findByIdAndDelete(_id)
    return category
}

const deleteProduct = async (_id) =>{
    const product = await Product.findByIdAndDelete(_id)
    return product
}

export default {
    getProductByAttribute,
    createProduct,
    getAllProducts,
    getCategoryByAttribute,
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    deleteProduct
    
};