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
const updateUserByAttribute = async (filterKey, filterValue, column, value) => {
    const query = {}
    query[filterKey] = filterValue;
    const update = {}
    update[column] = value;
    return await User.findOneAndUpdate(query, { $set: update }, { new: true });
}
const saveSession = async (session) => {
    const newSession = new Session(session);
    return await newSession.save();
}
const getSessionByAttributes = async (key1, value1, key2, value2) => {
    const query = {}
    query[key1] = value1;
    query[key2] = value2;
    return await Session.findOne(query);
}
const destroySessionByAttributes = async (key1, value1, key2, value2) => {
    const query = {}
    query[key1] = value1;
    query[key2] = value2;
    return await Session.findOneAndDelete(query, { returnDocument: 'before' });
}



export default {
    getUserByAttribute,
    createUser,
    saveSession,
    getSessionByAttributes,
    destroySessionByAttributes,
    updateUserByAttribute
}