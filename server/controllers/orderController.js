import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from 'stripe'
import User from '../models/User.js'
import Payment from "../models/Payment.js";
import Address from '../models/Address.js'

const generateOrderId = () => {
  return 'PM' + Math.floor(10000000 + Math.random() * 90000000);
};


export const placeOrderCOD = async (req,res) => {
    try{
        const { userId, items, addressId} = req.body;
        if(!addressId || items.length === 0){
            return res.json({success:false, message: "Invalid data"})
        }
        let amount = await items.reduce(async (acc, item) =>{
            const product = await Product.findById(item.product);
            return (await acc) + product.price * item.quantity;
        }, 0)
        //Add Tax Charge
        amount += Math.floor(amount * 0.02);

        // ✅ Generate Custom Order ID
        const customOrderId = generateOrderId();

        const order = await Order.create({
            userId,
            items,
            amount,
            address:addressId,
            orderNumber: customOrderId, 
        })

        await Payment.create({
          orderId:order._id,
          orderNumber: customOrderId, 
          payment_type: "cod",
          payment_status: "pending",
          amount
        })

        // ✅ CLEAR USER CART
    await User.findByIdAndUpdate(userId, {
      $set: { cartItems: {} }
    });

        return res.json({success:true, message: "Order Placed Successfully"})
    }catch(error){
     console.log(error.message);
     res.json({success:false, message:error.message})
   }
}

export const placeOrderStripe = async (req,res) => {
    try{
        const { userId, items, addressId} = req.body;
        const {origin} = req.headers;


        if(!addressId || items.length === 0){
            return res.json({success:false, message: "Invalid data"})
        }

        let productData = [];
        let amount = 0;

        for (const item of items) {
         const product = await Product.findById(item.product);

         productData.push({
           name: product.name,
           price: product.price,
           quantity: item.quantity,
        });

        amount += product.price * item.quantity;
    }

    // Add 2% tax only once
    const taxAmount = Math.floor(amount * 0.02);

    amount += taxAmount;

     // ✅ Generate Custom Order ID
        const customOrderId = generateOrderId();

        const order = await Order.create({
            userId,
            items,
            amount,
            address:addressId,
            orderNumber: customOrderId, 
        })

        await Payment.create({
          orderId:order._id,
          orderNumber: customOrderId, 
          payment_type: "online",
          payment_status: "pending",
          amount
        })
       
        const address = await Address.findById(addressId)

        //console.log("address: ",address)

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        const customer = await stripeInstance.customers.create({
              name: address.firstName,
              address: {
              line1: address.street,
              postal_code: address.zipcode,
              city: address.city,
              state: address.state,
              country: address.country,
         },
        });

        const line_items = productData.map((item) => {
          return {
            price_data : {
              currency: "inr",
              product_data: {
                name: item.name
              },
              unit_amount: Math.floor(item.price + item.price * 0.02) * 100
            },
            quantity: item.quantity
          }
        })

        const session = await stripeInstance.checkout.sessions.create({
          line_items,
          mode: "payment",
          customer: customer.id, // Link the customer to the checkout session
          success_url: `${origin}/loader?next=my-orders`,
          cancel_url: `${origin}/cart`,
          metadata: {
            orderId: order._id.toString(),
            userId: userId.toString()
          }
        })

        return res.json({success:true, url: session.url})


    }catch(error){
     console.log(error.message);
     res.json({success:false, message:error.message})
   }
}

//VERIFY PAYMENT
export const stripeWebhooks = async (request,response) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

  const sig = request.headers["stripe-signature"]
  let event;

  try{
     event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
     )
  } catch (error){
     response.status(400).send(`Webhook Error: ${error.message}`)
  }
  switch(event.type){
     case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      })

      const {orderId,userId} = session.data[0].metadata;
      await Payment.findOneAndUpdate({ orderId },{ payment_status: "completed", transaction_id: paymentIntentId });

      await User.findByIdAndUpdate(userId,{cartItems: {}})
      break;
     }
     case "payment_intent.payment_failed" : {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      })

      const {orderId} = session.data[0].metadata;
      await Order.findByIdAndDelete(orderId);
      await Payment.findOneAndDelete({orderId});
      break;
     }
     default:
      console.error(`Unhandled event type ${event.type}`)
      break;
  }
  response.json({received: true})
}


export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Missing userId" });
    }

    // STEP 1 — Populate items.product AND product.category AND address
    let orders = await Order.find({ userId })
      .populate({
        path: "items.product",
        select: "name image price category",
        populate: {
          path: "category",          // <-- this is the magic line
          model: "category",
          select: "name image"
        }
      })
      .populate({
        path: "address",
        select: "firstName lastName email street city state zipcode country phone"
      })
      .sort({ createdAt: -1 })
      .lean();

    let finalOrders = [];

    // STEP 2 — Filter based on payment
    for (let order of orders) {
      const payment = await Payment.findOne({ orderId: order._id }).lean();

      if (!payment) continue;
      if (!(payment.payment_type === "cod" || payment.payment_status === "completed")) {
        continue;
      }

      order.payment = payment;
      finalOrders.push(order);
    }
    //console.log("final orders: ",finalOrders)
    return res.json({ success: true, orders: finalOrders });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};




//Get All order (for seller/admin)
export const getAllOrders = async (req, res) => {
  try {
    // 1. Fetch all orders with product + address populated
    const orders = await Order.find()
      .populate("items.product address")
      .sort({ createdAt: -1 })
      .lean();

    const orderIds = orders.map(o => o._id);

    // 2. Fetch all payments linked to these orders
    const payments = await Payment.find({ orderId: { $in: orderIds } }).lean();

    // Convert to map for fast lookup
    const paymentMap = {};
    for (let pay of payments) {
      paymentMap[pay.orderId] = pay;
    }

    // 3. Attach payment + filter valid ones
    const finalOrders = orders
      .map(order => {
        const payment = paymentMap[order._id];

        if (!payment) return null;

        if (
          payment.payment_type !== "cod" &&
          payment.payment_status !== "completed"
        ) {
          return null;
        }

        return { ...order, payment };
      })
      .filter(Boolean); // remove nulls

      //console.log("orders: ",finalOrders)

    res.json({ success: true, finalOrders });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const updateOrderStatus = async (req, res) => {

  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Missing orderId or status" });
    }

    // Update status using Mongoose
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.json({ success: false, message: "Order not found" });
    }

    // Fetch payment info for this order
    const payment = await Payment.findOne({ orderId });

    if (payment?.payment_type === "cod") {
      payment.payment_status = status === "Delivered" ? "completed" : "pending";
      await payment.save();
    }


    return res.json({  success: true, message: "Order status updated", order: updatedOrder });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
