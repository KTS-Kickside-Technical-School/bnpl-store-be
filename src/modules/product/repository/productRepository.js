import Product from "../../../databases/models/product.js";


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
export default {
    getProductByAttribute,
    createProduct,
    getAllProducts
};