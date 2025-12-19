import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true, maxlength: 100 },
    path: { type: String, required: true, trim: true, maxlength: 100 },
    image: {  type: String,  default: null}
  },{ timestamps: true });

const Category = mongoose.models.category || mongoose.model('category',categorySchema)

export default Category;
