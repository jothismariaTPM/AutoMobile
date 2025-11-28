import express from 'express'
import { upload } from '../config/multer.js';
import authSeller from '../middleware/authSeller.js';
import authUser from '../middleware/authUser.js';
import { addProduct, changeStock, productById, ProductList, addCategory, getCategory, deleteCategory } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array(["images"]), authSeller,addProduct);
productRouter.get('/list', ProductList);
productRouter.get('/id', productById);
productRouter.post('/stock', authSeller, changeStock);

productRouter.post('/category', upload.single("image"), authSeller, addCategory);
productRouter.get('/category', authSeller, getCategory);
productRouter.get('/user/category', authUser, getCategory);
productRouter.delete('/category', authSeller, deleteCategory);

export default productRouter