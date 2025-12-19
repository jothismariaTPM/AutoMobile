import express from 'express';
import authUser from '../middleware/authUser.js';
import { removeFromCartItem, updateCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/update', authUser, updateCart);
cartRouter.post('/remove', authUser, removeFromCartItem);

export default cartRouter