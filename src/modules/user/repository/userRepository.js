import mongoose from "mongoose";
import User from "../../../databases/models/user.js";

const updateUser = (filter, data) => {
    return User.findOneAndUpdate(filter, { $set: data }, { new: true });
}

export default { updateUser };
