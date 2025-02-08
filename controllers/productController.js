import Product from "../models/product.js";

export function getProducts(req, res) {

    Product.find().then((productList) => {
        res.json({ List: productList })
    }

    ).catch(() => {
        res.json({
            message: "Error finding products"
        })
    })
}


export function createProduct(req, res) {
    //console.log(req.user);
    if (req.user == null) {
        res.json({ message: "You must be logged in to add a product" })
        return
    }

    if (req.user.type != "admin") {
        res.json({ message: "You are not a admin" })
        return
    }



    const product = new Product(req.body);

    product.save().then(() => {
        res.json(
            { message: "Product created" }
        )
    }).catch(() => {
        res.json(
            { message: "Error creating product" }
        )
    })
}


export function deleteProduct(req, res) {
    Product.deleteOne({ name: req.params.name }).then(() => {
        res.json({ message: "Product deleted" })
    }
    ).catch(() => {
        res.json(
            { message: "Error deleting product" }
        )
    })
}


export function getProductByName(req, res) {
    const name = req.params.name;

    Product.find({ name: name }).then((productList) => {

        if (productList.length === 0) {
            res.json(
                { message: "Product not found" }
            )
        } else {
            res.json(
                { List: productList }
            )
        }
    }).catch(() => {
        res.json(
            { message: "Error finding product" }
        )
    })
}