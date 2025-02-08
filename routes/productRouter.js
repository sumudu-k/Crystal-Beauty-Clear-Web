import express from 'express';
import { createProduct, deleteProduct, getProducts, getProductByName } from '../controllers/productController.js';

const productRouter = express.Router();

// create routes
productRouter.get("/", getProducts);
productRouter.post("/", createProduct);
productRouter.delete("/:name", deleteProduct);

productRouter.get("/:name", getProductByName);

export default productRouter;






