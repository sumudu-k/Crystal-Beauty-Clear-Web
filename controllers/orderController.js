import Order from '../models/orderModel.js';
import { isCustomer } from './userController.js';
export async function createOrder(req, res) {
    //order number format
    // cbc0001

    //first check user is logged in 
    if (!isCustomer) {
        res.status(401).json({
            message: 'Please login to place an order'
        })
    }

    // take the latest order id
    try {
        const latestOrder = await Order.find().sort({ date: -1 }).limit(1);

        let orderId;
        if (latestOrder.length === 0) {
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
        newOrderdata.orderId = orderId;
        newOrderdata.email = req.user.email;

        //creates a new order
        const order = new Order(newOrderdata);
        await order.save();
        res.json({
            message: 'Order created successfully',
        })




    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}









