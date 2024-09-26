import mongoose from "mongoose";

export const termSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    
    Type: {
        type: String,
        required: true
    },
    Text:{
        type: String,
        required: true
    },
    Status:{
        type: String,
        required: true
    }
},{timestamps: true} )

const Term = mongoose.model("Term", termSchema);

export default Term;