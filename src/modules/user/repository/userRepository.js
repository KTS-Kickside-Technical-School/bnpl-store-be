import mongoose from "mongoose";
import User from "../../../databases/models/user.js";

const updateUser = async (filter, data) => {
    return await User.findOneAndUpdate(filter, { $set: data }, { new: true });
}

const getProfileByAttribute = async (key, value) => {
    const query = {}
    query[key] = value;
    return await User.findOne(query)
}

export default { updateUser, getProfileByAttribute };
