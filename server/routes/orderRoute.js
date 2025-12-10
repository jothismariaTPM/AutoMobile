import express from 'express'
import authUser from '../middleware/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe, updateOrderStatus } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod',authUser,placeOrderCOD)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.get('/user',authUser,getUserOrders)
orderRouter.get("/seller",authSeller,getAllOrders)
orderRouter.post("/status",authSeller,updateOrderStatus)

export default orderRouter;