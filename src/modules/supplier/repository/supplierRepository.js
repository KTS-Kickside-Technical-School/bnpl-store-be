import Supplier from "../../../databases/models/supplier.js";

const createSupplier = async (data) => {
  const newSupplier = new Supplier(data);
  return await newSupplier.save();
};

const findSupplierByAttributes = async ({ Email, Firstname, Lastname }) => {
  return await Supplier.findOne({
    $and: [
      { Email },
      { Firstname, Lastname }
    ]
  });
};

const getAllSupplier = async () =>{
    return await Supplier.find();
};

const getSupplierById = async (id) =>{
    try {
        return await Supplier.findById(id)
    } catch (error) {
        throw new Error(`Could not retreive supplier with id ${id}: ${error.message}`)
    }
};


const deleteSupplierById = async (id) => {
    try {
        const results = await Supplier.findByIdAndDelete(id);
        return results;
    } catch (error) {
        throw new Error(`Could not delete supplier with id ${id}: ${error.message}`);
    }
}


const updateSupplierById = async (id, updateData) => {
  try {
    const updatedSuppplier = await Supplier.findByIdAndUpdate(id, updateData, {new: true} )
    return updatedSuppplier;

  } catch (error) {

    throw new Error(`Could not update supplier with id ${id}: ${error.message}`)
    
  }
 
}

export default {
  createSupplier,
  findSupplierByAttributes,
  getAllSupplier,
  getSupplierById,
  deleteSupplierById,
  updateSupplierById

};
