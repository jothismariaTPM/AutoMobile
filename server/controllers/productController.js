import Product from '../models/Product.js'
import Category from '../models/Category.js';

export const addProduct = async (req, res) => {
  try {
    if (!req.body.productData) {
      return res.status(400).json({ success: false, message: "Missing productData" });
    }

    const productData = JSON.parse(req.body.productData);

    // Access fields correctly
    const images = req.files?.images || [];
    const testingVideo = req.files?.testingVideo?.[0] || null;

    if (images.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    // Convert paths for frontend use
    const imagesUrl = images.map((file) => {
      return `/uploads/products/${file.filename}`;
    });

    const testingVideoUrl = testingVideo
      ? `/uploads/videos/${testingVideo.filename}`
      : null;

    // Save product
    await Product.create({
      ...productData,
      image: imagesUrl,
      testingVideo: testingVideoUrl,
    });

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



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

export const getProductsByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid ids" });
    }

    // Fetch all products
    const products = await Product.find({ _id: { $in: ids } });

    // Reorder products based on ids array
    const orderedProducts = ids
      .map(id => products.find(p => p._id.toString() === id))
      .filter(Boolean); // remove nulls

    return res.json({
      success: true,
      products: orderedProducts
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};




export const updateProduct = async (req, res) => {
  try {
    // -----------------------------
    // 1. Parse productData JSON
    // -----------------------------
    let productData;

    try {
      productData = JSON.parse(req.body.productData);
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid productData JSON" });
    }

    const productId = productData._id;

    console.log("backend parsed productData:", productData);
    console.log("backend productId:", productId);

    // -----------------------------
    // 2. Validate Product ID
    // -----------------------------
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    // -----------------------------
    // 3. Find Existing Product
    // -----------------------------
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // -----------------------------
    // 4. Uploaded Files
    // -----------------------------
    const images = req.files?.images || [];
    const testingVideo = req.files?.testingVideo?.[0] || null;

    // -----------------------------
    // 5. Images Update Logic
    // Keep old images unless new ones uploaded
    // -----------------------------
    let updatedImages = existingProduct.image; // default: keep old images

    if (images.length > 0) {
      updatedImages = images.map((file) => `/uploads/products/${file.filename}`);
    }

    // -----------------------------
    // 6. Video Update Logic
    // Keep old video unless new one uploaded
    // -----------------------------
    let updatedTestingVideo = existingProduct.testingVideo;

    if (testingVideo) {
      updatedTestingVideo = `/uploads/videos/${testingVideo.filename}`;
    }

    // -----------------------------
    // 7. Update Product
    // -----------------------------
    await Product.findByIdAndUpdate(
      productId,
      {
        ...productData,
        image: updatedImages,
        testingVideo: updatedTestingVideo,
      },
      { new: true }
    );

    return res.json({success: true, message: "Product Updated Successfully"});

  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};



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

export const removeProduct = async (req, res) => {
  console.log("entering remove product function",req.body)
  try {
    const { productId } = req.body;
    console.log("product id: ",productId)

    await Product.findByIdAndDelete(productId);

    return res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

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

    // filename from multer
    const imageUrl = `/uploads/categories/${req.file.filename}`;

    const newCategory = new Category({
      name,
      path: name,
      image: imageUrl
    });

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

    //  Check if category exists
    const category = await Category.findById(id);

    if (!category) {
      return res.json({ success: false, message: "Category not found" });
    }

    //  Check if products are linked to this category
    const productCount = await Product.countDocuments({ category: id });

    if (productCount > 0) {
      return res.json({ success: false, message: "Cannot delete category because products are linked to it" });
    }


    // Delete category in MongoDB
    await Category.findByIdAndDelete(id);

    res.json({ success: true, message: "Category deleted successfully" });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
