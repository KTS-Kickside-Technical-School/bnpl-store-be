import Cart from "../../../databases/models/cart.js";



const addProductToCart = async (data) => {
  const newCart = new Cart(data);  
  return await newCart.save();
};


const addManyProductsToCart = async (products) => {
  return await Cart.insertMany(products); 
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

const deleteProductFromCart = async ( userId, productId)=>{
  return await Cart.findOneAndDelete ({ userId, productId })
}

const deleteAllProductFromCart = async (userId) => {
  return await Cart.deleteMany({ userId }); 
};


export default {
  addProductToCart,
  addManyProductsToCart,
  updateCartQuantity,
  getCartByAttribute,
  getCartByAttributes,
  deleteProductFromCart,
  deleteAllProductFromCart
  
};
