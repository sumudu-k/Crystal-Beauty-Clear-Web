import Product from '../models/product.js';

export function createProduct(req, res) {
    if (!isAdmin(req)) {
        res.json({ message: "You are not authorized to add a product" });
        return;
    }
}











