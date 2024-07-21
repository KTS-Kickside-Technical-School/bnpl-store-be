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
export default { getProductByAttribute, createProduct }