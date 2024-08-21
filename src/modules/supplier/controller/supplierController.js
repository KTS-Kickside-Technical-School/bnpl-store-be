import httpStatus from "http-status";
import supplierRepository from "../repository/supplierRepository.js";

const adminCreateSupplier = async (req, res) => {
  try {
    const { Firstname, Lastname, Email, Phone, Location, Company } = req.body;
    const supplierData = { Firstname, Lastname, Email, Phone, Location, Company };
    const supplier = await supplierRepository.createSupplier(supplierData);

    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Supplier created successfully",
      data: supplier
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  }
};

const getAllSupplier = async (req, res) =>{
    try {
        const suppliers= await supplierRepository.getAllSupplier();
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            data: suppliers
        });

        
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
        
    }
}

const getSupplierById = async (req,res) =>{
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(httpStatus.BAD_REQUEST).json({
              status: httpStatus.BAD_REQUEST,
              message: "Supplier ID is required"
            });
          }
        const supplier = await supplierRepository.getSupplierById(id);
        if (!supplier){
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "Supplier Not Found"
            })
        }
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            data: supplier
        })
        
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
        
    }
}


const deleteSupplier = async (req,res) =>{
    try {
        const {id} = req.params;
        
        if (!id) {
            return res.status(httpStatus.BAD_REQUEST).json({
              status: httpStatus.BAD_REQUEST,
              
              message: "Supplier ID is required"
            });
          }
        const deletedSupplier = await supplierRepository.deleteSupplierById(id);
        if (!deletedSupplier){
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "Supplier Not Found"
            })
        }
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Supplier Deleted Successfully",
            data: deletedSupplier
        })
        
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
        
    }
};

const updateSupplier = async (req, res) =>{
  try {
    const {id}=req.params;
    const updateData = req.body

    if (!id){

      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: "Supplier ID is required"
      })
    }

    const updatedSuppplier = await supplierRepository.deleteSupplierById(id, updateData);
    if (!updatedSuppplier){
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "Supplier Not Found"
      })
    }
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Supplier Updated Successfully",
      data: updatedSuppplier
    })
  } catch (error) {
    
  }

}



export default {
  adminCreateSupplier,
  getAllSupplier,
  getSupplierById,
  deleteSupplier,
  updateSupplier
};
