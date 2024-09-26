import httpStatus from "http-status";
import Term from "../databases/models/terms.js";
import termsRepository from "../modules/terms/repository/termsRepository.js"


export const isTermsAlreadyExist = async (req, res, next) =>{
    try {
        const term = await termsRepository.getTermsByAttribute(
            "Name",
            req.body.Name
        );

        if (term ){
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: "Terms Already Exist"
            });
        }
        return next();
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: message.error
        })
        
    }
}