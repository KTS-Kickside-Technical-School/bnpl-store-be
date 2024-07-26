import Wishlist from "../../../databases/models/wishlist.js";
import WishlistProduct from "../../../databases/models/wishlist.js";

const addProductToWishlist = async(data)=> {
    const newWishlist = new Wishlist (data);
    const newWishlistPrduct = new WishlistProduct (data);
    return await {newWishlist,newWishlistPrduct}.save();
}; 

const getWishlistByAttribute = async (key, name) => {
    const query ={};
    query[key] = name
    return {Wishlist, WishlistProduct}.findOne(query);
};

const getWishlistByAttributes = async (key1, value1, key2, value2) => {
    const query ={};
    query[key1] = value1;
    query[key2] = value2;
    return Wishlist.findOne(query);
};

const updateWishlistByAttributes = async (filter, data)=>{
    return await {Wishlist,WishlistProduct}. findOneAndUpdate(filter,{$set: data}, {new: true});
};

export default {
    addProductToWishlist,
    getWishlistByAttribute,
    getWishlistByAttributes,
    updateWishlistByAttributes
};




