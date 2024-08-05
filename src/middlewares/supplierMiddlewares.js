import httpStatus from "http-status";
import supplierRepository from "../modules/supplier/repository/supplierRepository.js";

export const IsSupplierAlreadyExist = async (req, res, next) => {
  try {
    const { Firstname, Lastname, Email } = req.body;
    
    const existingSupplier = await supplierRepository.findSupplierByAttributes({ Firstname, Lastname, Email });

    if (existingSupplier) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: "Supplier with the same email and names already exists solve issue correctly."
      });
    }

    next();
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  }
};
