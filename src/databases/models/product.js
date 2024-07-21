import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    discount: {
        type: Number,
        default: 0
    },
    countingUnit: {
        type: String
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

export default Product;