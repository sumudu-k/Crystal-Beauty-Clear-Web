import Order from '../models/order.js';
import { isCustomer } from '../controllers/userController.js';
import Product from '../models/product.js';

export async function createOrder(req, res) {
    //order number format
    // cbc0001

    //first check user is logged in 
    if (!isCustomer(req)) {
        res.status(401).json({
            message: 'Please login to place an order'
        })
        return;
    }

    // take the latest order id
    try {
        const latestOrder = await Order.find().sort({ date: -1 }).limit(1);

        let orderId;
        if (latestOrder.length == 0) {
            orderId = 'CBC0001';
        }
        else {
            const currentOrderId = latestOrder[0].orderId;
            const numberString = currentOrderId.replace('CBC', '');
            const number = parseInt(numberString);
            const newNumber = (number + 1).toString().padStart(4, '0');
            orderId = 'CBC' + newNumber;
        }

        const newOrderdata = req.body;

        const newProductArray = [];

        for (let i = 0; i < newOrderdata.orderedItems.length; i++) {

            //print the ordered items
            //console.log(newOrderdata.orderedItems[i]);

            //Product is the model we created in product.js
            //load all product details from the product model which relavent to the ordered items
            const product = await Product.findOne({
                productId: newOrderdata.orderedItems[i].productId
            })

            if (product == null) {
                res.status(404).json({
                    message: 'Product not found with product ID' + newOrderdata.orderedItems[i].productId
                })
                return;
            }

            //get the product details what we need to create the ordered items array in json
            newProductArray[i] = {
                name: product.productName,
                price: product.price,
                quantity: newOrderdata.orderedItems[i].quantity,
                image: product.images[0],
            }
        }
        console.log(newProductArray);


        newOrderdata.orderId = orderId;
        newOrderdata.email = req.user.email;

        //creates a new order
        // const order = new Order(newOrderdata);
        // await order.save();
        // res.json({
        //     message: 'Order created successfully',
        // })




    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}









