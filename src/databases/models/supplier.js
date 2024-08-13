import mongoose, { model } from "mongoose";

const supplierSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Phone:{
        type: String,
        required: true
    },
    Location:{
        type: String,
        null: true,
        required: true
    },
    Company:{
        type: String,
        required: true
    }
}, {timestamps: true})

const Supplier = mongoose.model('supplier', supplierSchema)

export default Supplier
