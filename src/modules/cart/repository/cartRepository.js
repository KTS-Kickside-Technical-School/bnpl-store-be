import Cart from "../../../databases/models/cart.js";
import { stripe } from "../../../services/stripe.js";

const addProductToCart = async (data) => {
  const newCart = new Cart(data);
  return await newCart.save();
};

const updateCartQuantity = async (cartId, quantity) => {
  return await Cart.findByIdAndUpdate(cartId, { quantity }, { new: true });
};

const getCartByAttribute = async (key, name) => {
  const query = {};
  query[key] = name;
  return await Cart.findOne(query);
};

const getCartByAttributes = async (key1, value1, key2, value2) => {
  const query = {};
  query[key1] = value1;
  query[key2] = value2;
  return await Cart.findOne(query);
};

const findCartByProductAndUserId = async (productId, userId) => {
  return await Cart.findOne({ productId, userId });

}

const deleteProductFromCart = async (productId, userId) => {
  return await Cart.findOneAndDelete({ productId, userId });
}

const findCartItemsByUserId = async (userId) => {
  return await Cart.find({ userId }).populate('productId');
}

const createStripeProduct = async (body) => {
  return await stripe.products.create(body);
};

const findStripeCustomerByAttribute = async (primaryKey, primaryValue) => {
  const customer = await stripe.customers.search({ query: `${primaryKey}: '${primaryValue}'` });
  return customer.data[0];
};

const createStripeCustomer = async (body) => {
  return await stripe.customers.create(body);
};

const createStripeSession = async (body) => {
  return await stripe.checkout.sessions.create(body);
};

export default {
  addProductToCart,
  updateCartQuantity,
  getCartByAttribute,
  getCartByAttributes,
  deleteProductFromCart,
  findCartItemsByUserId,
  findCartByProductAndUserId,
  createStripeProduct,
  findStripeCustomerByAttribute,
  createStripeCustomer,
  createStripeSession
};
