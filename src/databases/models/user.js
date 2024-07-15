import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: false
    },
    nId: {
        type: Number,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    address: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, { timestamps: true });



const User = mongoose.model('User', userSchema);

export default User;
