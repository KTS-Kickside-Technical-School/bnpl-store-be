import User from "../../../databases/models/user.js";


const getUserByAttribute = async (key, value) => {
    const query = {}
    query[key] = value;
    return await User.findOne(query);
}
const createUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
}

export default { getUserByAttribute,createUser }