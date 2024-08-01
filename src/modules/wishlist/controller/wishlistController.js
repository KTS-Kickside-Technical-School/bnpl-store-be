import httpStatus from "http-status";
const INTERNAL_SERVER_ERROR = httpStatus.INTERNAL_SERVER_ERROR;
import wishlistRepository from "../repository/wishlistRepository.js";

export const addProductToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.product._id;
    const data = { userId, productId };
    const wishlist = await wishlistRepository.addProductToWishlist(data);
    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Product Added To Wishlist",
      data: { wishlist },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

export const getUserWishList =  async (req, res)=>{
  try {
    const userId= req.user._id;
    const wihlistItems = await wishlistRepository.getWishlstByUserId(userId);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "List of all product added to wish list",
      data: wihlistItems
    })
    
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: INTERNAL_SERVER_ERROR,
      message: error.message
    })
    
  }
}

export const deleteProductfromWishlst = async(req, res)=>{
  try {
    const userId = req.user._id;
    const productId = req.body.productId;
    const deleteWishlistItem = await wishlistRepository.deleteProductfromWishlst(userId,productId)
    if (!deleteWishlistItem){
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "Product Not Found in Wishlist"
      })
    }
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Product Removed Sucessfully from Wishlist",

    })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status:INTERNAL_SERVER_ERROR,
      message: error.message
    })
    
  }
}
export default { addProductToWishlist, getUserWishList,deleteProductfromWishlst };
