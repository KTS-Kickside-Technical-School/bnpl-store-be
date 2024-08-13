import Cart from "../../../databases/models/cart.js";

const addProductsToCart = async (data) => {
  const newCart = new Cart(data);
  return await newCart.save();
};
const getCartByAttribute = async (key, name) => {
  const query = {};
  query[key] = name;
  return Cart.findOne(query);
};

const getCartByAttributes = async (key1, value1, key2, value2) => {
  const query = {};
  query[key1] = value1;
  query[key2] = value2;
  return Cart.findOne(query);
};
const updateCartByAttributes = async (filter, data) => {
  return await Cart.findOneAndUpdate(filter, { $set: data }, { new: true });
};
export default {
  addProductsToCart,
  getCartByAttribute,
  getCartByAttributes,
  updateCartByAttributes,
};
