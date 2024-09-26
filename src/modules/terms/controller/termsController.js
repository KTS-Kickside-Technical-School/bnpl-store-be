import httpStatus from "http-status";
import termRepository from "../repository/termsRepository.js"

const adminCreateTerms = async (req, res)=>{
    try {
        
        const {Name, Type, Text, Status } = req.body
        const data = {Name, Type, Text, Status}
        if(!data){
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: " Missing Fields"
            })
        };

        const term = await termRepository.CreateTerms(data)
        return res.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            message:"Terms created successfully",
            data: {term}

        })
        
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
        
    }
} 


export default {
    adminCreateTerms
}