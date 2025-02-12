import Product from '../models/product.js';
import { isAdmin } from './userController.js';
export function createProduct(req, res) {
    if (!isAdmin(req)) {
        res.json({ message: "You are not authorized to add a product" });
        return;
    }
    const newProductData = req.body;
    const product = new Product(newProductData);
    product.save().then(() => {
        res.json({ message: "Product created" });
    }).catch((error) => {
        res.json({ message: error });
    })
}


export function getProducts(req, res) {
    Product.find().then((products) => {
        res.json(products);
    })
}








