import Term from "../../../databases/models/terms.js";

const CreateTerms = async(data)=>{
    const newTerms = new Term(data)
    return await newTerms.save();
}


const getTermsByAttribute = async (key, Name) =>{
    const query = {}
    query[key] = Name
    return await Term.findOne(query)
    
}


export default {
    CreateTerms,
    getTermsByAttribute
}