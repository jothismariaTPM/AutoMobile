import express from 'express'
import upload from '../config/multer.js';
import authSeller from '../middleware/authSeller.js';
import authUser from '../middleware/authUser.js';
import { addProduct, changeStock, productById, ProductList, addCategory, getCategory, deleteCategory, updateProduct, removeProduct, getProductsByIds } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add',
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "testingVideo", maxCount: 1 }
  ]),
  authSeller,
  addProduct
);
productRouter.get('/list', ProductList);
productRouter.get('/id', productById);
productRouter.post("/bulk", getProductsByIds);
productRouter.put("/update",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "testingVideo", maxCount: 1 }
  ]),
  updateProduct
);

productRouter.post('/stock', authSeller, changeStock);
productRouter.delete('/remove', authSeller, removeProduct);
productRouter.post('/category', upload.single("image"), authSeller, addCategory);
productRouter.get('/category', authSeller, getCategory);
productRouter.get('/user/category', getCategory);
productRouter.delete('/category', authSeller, deleteCategory);

export default productRouter