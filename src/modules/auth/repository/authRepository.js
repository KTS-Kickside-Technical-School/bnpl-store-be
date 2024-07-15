import User from "../../../databases/models/user.js";
import Session from "../../../databases/models/session.js";

const getUserByAttribute = async (key, value) => {
    const query = {}
    query[key] = value;
    return await User.findOne(query);
}
const createUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
}

const saveSession = async (session) => {
    const newSession = new Session(session);
    return await newSession.save();
}




export default { 
    getUserByAttribute,
    createUser,
    saveSession 
}