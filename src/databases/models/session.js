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

const otpTokenSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    token: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  });

const OtpToken = mongoose.model('OtpToken', otpTokenSchema);
const Session = mongoose.model('Session', sessionSchema)

export default Session