import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

    userId: { 
        type: String,
        ref: "User", 
        required: true 
    },
    productId: {
        type: String,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        ref: "Product",
        required: true,
        min: 1
    }
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
