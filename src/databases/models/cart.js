
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    // ref: "User",
    type: String,
    required: true,
  },
  productId: {
    // ref: "Product",
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Cart =mongoose.model('Cart',cartSchema);
export default Cart