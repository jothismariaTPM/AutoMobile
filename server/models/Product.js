import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required:true},
    description: {type: Array, required:true},
    price: {type: Number, required:true},
    image: {type: Array, required:true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
    partNumber: { type: String, required: true },      
    programming: { type: String, required: true },     
    carModel: { type: String, required: true },
    compatibleModels: { type: String, required: true },

     // OPTIONAL FIELDS
    compatiblePartNumber: { type: String },
    productBrand: { type: String },
    packagingDetails: { type: String },
    warranty: { type: String },
    deliveryTime: { type: String },
    testingVideo: { type: String }, 
    condition: { type: String },
    inStock: {type: Boolean, default: true}
    
},{timestamps: true})

const Product = mongoose.models.product || mongoose.model('product',productSchema);

export default Product;