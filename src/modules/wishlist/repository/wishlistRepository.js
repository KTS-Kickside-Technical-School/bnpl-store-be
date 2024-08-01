import Wishlist from "../../../databases/models/wishlist.js";

const addProductToWishlist = async(data) => {
    const newWishlist = new Wishlist(data);
    return await newWishlist.save();
}; 

const getWishlstByUserId =async(userId)=>{
    return await Wishlist.findOne({userId})

}

const getWishlistByAttribute = async (key, name) => {
    const query = {};
    query[key] = name;
    return await Wishlist.findOne(query);
};

const getWishlistByAttributes = async (key1, value1, key2, value2) => {
    const query = {};
    query[key1] = value1;
    query[key2] = value2;
    return await Wishlist.findOne(query);
};

const updateWishlistByAttributes = async (filter, data) => {
    return await Wishlist.findOneAndUpdate(filter, { $set: data }, { new: true });
};

const deleteProductfromWishlst = async (userId,productId)=>{
    return await Wishlist.findOneAndDelete({userId,productId})
}

export default {
    addProductToWishlist,
    getWishlstByUserId,
    getWishlistByAttribute,
    getWishlistByAttributes,
    updateWishlistByAttributes,
    deleteProductfromWishlst
};
