import Order from '../models/order.js';
import { isAdmin, isCustomer } from '../controllers/userController.js';
import Product from '../models/product.js';

export async function createOrder(req, res) {
    //order number format
    // cbc0001

    if (!isCustomer(req)) {
        res.status(401).json({
            message: 'Please login to place an order'
        })
        return;
    }

    try {
        const latestOrder = await Order.find().sort({ orderId: -1 }).limit(1);

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
            const product = await Product.findOne({
                productId: newOrderdata.orderedItems[i].productId
            })

            if (product == null) {
                res.status(404).json({
                    message: 'Product not found with product ID' + newOrderdata.orderedItems[i].productId
                })
                return;
            }

            newProductArray[i] = {
                name: product.productName,
                price: product.lastPrice,
                quantity: newOrderdata.orderedItems[i].qty,
                image: product.images[0],
            }
        }
        console.log(newProductArray);

        newOrderdata.orderedItems = newProductArray;


        newOrderdata.orderId = orderId;
        newOrderdata.email = req.user.email;

        //creates a new order
        const order = new Order(newOrderdata);
        const savedOrder=await order.save();
        res.json({
            message: 'Order created successfully',
            order:savedOrder
        })




    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

export async function getOrders(req,res){
    try{
        if(isCustomer(req)){
            const orders=await Order.find({email:req.user.email})
            res.json(orders)
            return
        }else if(isAdmin(req)){
            const orders=await Order.find()
            res.json(orders)
            return
        }else{
            res.json("please login to see orders")
        }
        
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

export async function getQuote(req,res){
    try { 
        const newOrderdata = req.body;
        const newProductArray = [];
        let total=0;
        let labledTotal=0;


        for (let i = 0; i < newOrderdata.orderedItems.length; i++) {
            const product = await Product.findOne({
                productId: newOrderdata.orderedItems[i].productId
            })

            if (product == null) {
                res.status(404).json({
                    message: 'Product not found with product ID' + newOrderdata.orderedItems[i].productId
                })
                return;
            }
            labledTotal+=product.price*newOrderdata.orderedItems[i].qty;
            total+=product.lastPrice*newOrderdata.orderedItems[i].qty;

            newProductArray[i] = {
                name: product.productName,
                price: product.lastPrice,
                labeldPrice:product.price,
                quantity: newOrderdata.orderedItems[i].qty,
                image: product.images[0],
            }
        }
        console.log(newProductArray);
        newOrderdata.orderedItems = newProductArray;
        newOrderdata.total=total;

        res.json({
            orderedItems:newProductArray,
            total:total,
            labledTotal:labledTotal
        });


    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}



export async function updateOrderStatus(req, res) {
    try {
        if (!isAdmin(req)) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { orderId } = req.params;
        let { status } = req.body || {};
        if (!orderId) {
            return res.status(400).json({ message: 'orderId is required' });
        }
        if (!status) {
            return res.status(400).json({ message: 'status is required' });
        }

        // Normalize and validate status
        const normalize = (s) => {
            const x = String(s).toLowerCase();
            if (x === 'preparing') return 'Preparing';
            if (x === 'shipped') return 'Shipped';
            if (x === 'delivered') return 'Delivered';
            if (x === 'canceled' || x === 'cancelled') return 'Canceled';
            return s;
        };
        status = normalize(status);
        const allowed = ['Preparing', 'Shipped', 'Delivered', 'Canceled'];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const updated = await Order.findOneAndUpdate(
            { orderId },
            { $set: { status } },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Status updated', order: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}






