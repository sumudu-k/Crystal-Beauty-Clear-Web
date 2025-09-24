import express from 'express';
import { createOrder, getOrders, getQuote, updateOrderStatus } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/", createOrder)
orderRouter.get("/",getOrders)
orderRouter.post("/quote",getQuote)
orderRouter.put("/:orderId/status", updateOrderStatus)

export default orderRouter;

