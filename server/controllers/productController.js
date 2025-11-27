import {v2 as cloudinary} from 'cloudinary'
import Product from '../models/Product.js'
import Category from '../models/Category.js';

const uploadToCloudinary = async (filePath, retries = 3) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      timeout: 90000, // ⏱️ 90 seconds Cloudinary-side timeout
    });

    return result;
  } catch (error) {
    console.error("Upload attempt failed:", error);

    if (retries > 0) {
      console.warn(`Retrying upload... attempts left: ${retries - 1}`);
      await new Promise((res) => setTimeout(res, 1000)); // Wait 1s
      return uploadToCloudinary(filePath, retries - 1);
    }

    throw new Error(error.message || "Cloudinary upload failed");
  }
};




export const addProduct = async (req,res) => {
   try{
     if (!req.body.productData) {
      return res.status(400).json({ success: false, message: "Missing productData" });
    }
     let productData = JSON.parse(req.body.productData)
     
     const images = req.files

     {/*let imagesUrl = await Promise.all(
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
            return result.secure_url
        })
     )*/}
     const imagesUrl = await Promise.all(
  images.map(async (item) => {
    const result = await uploadToCloudinary(item.path);
    return result.secure_url;
  }));

     await Product.create({...productData, image: imagesUrl})

     res.json({success:true, message: "Product Added"})
   }catch(error){
     console.log("error: ",error.message);
     res.json({success:false, message:error.message})
   }
}

export const ProductList = async (req,res) => {
   try{
      const products = await Product.find({}).populate("category", "name image");
      //console.log("Entering product list",products)
      res.json({success:true, products})
   }catch(error){
     console.log(error.message);
     res.json({success:false, message:error.message})
   }
}

export const productById = async (req,res) => {
    try{
      const {id} = req.body;
      const product = await Product.findById(id);
      res.json({success:true, product})
   }catch(error){
     console.log(error.message);
     res.json({success:false, message:error.message})
   }
}

export const changeStock = async (req,res) => {
    try{
     const {id, inStock} = req.body;
     await Product.findByIdAndUpdate(id, {inStock})
     res.json({success:true, message: "Stock Updated"})
   }catch(error){
     console.log(error.message);
     res.json({success:false, message:error.message})
   }
}


export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ success: false, message: "Name is required" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "Image is required" });
    }

     // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ success: false, message: "Category already exists" });
    }

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    const imageUrl = result.secure_url; // store only URL

     // Save to MongoDB
    const newCategory = new Category({ name, image: imageUrl });

    await newCategory.save();

    res.json({ success: true, message: "Category added successfully" });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getCategory = async (req, res) => { 
  try {

    const categories = await Category.find()

    res.json({ success: true, message: "Categories fetched successfully", categories });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ success: false, message: "Category ID is required" });
    }

    // 1️⃣ Check if category exists
    const category = await Category.findById(id);

    if (!category) {
      return res.json({ success: false, message: "Category not found" });
    }

    // 2️⃣ Check if products are linked to this category
    const productCount = await Product.countDocuments({ category: id });

    if (productCount > 0) {
      return res.json({ success: false, message: "Cannot delete category because products are linked to it" });
    }

    // 3️⃣ Optional: delete Cloudinary image
    if (category.image) {
      try {
        const publicId = category.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log("Cloudinary delete error:", err.message);
      }
    }

    // 4️⃣ Delete category in MongoDB
    await Category.findByIdAndDelete(id);

    res.json({ success: true, message: "Category deleted successfully" });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
