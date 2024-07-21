import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    token: {
        type: String,
        required: true
    }
},{timestamps: true})

const Session = mongoose.model('Session', sessionSchema)

export default Session