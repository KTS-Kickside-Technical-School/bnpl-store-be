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
    return Product.find()
}

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
export default {
    getProductByAttribute,
    createProduct,
    getAllProducts,
    getCategoryByAttribute,
    createCategory,
    getAllCategories
};