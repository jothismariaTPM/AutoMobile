import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {type: String, required: true, ref: 'user'},
  orderNumber:{type:String, required:true},
  items: [{
    product: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product'},
    quantity: {type: Number, required: true},
  }],
  amount: {type: Number, required: true},
  address: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'address'},
  status: {type: String, default: "Order Placed"},
},{ timestamps: true })

const Order = mongoose.models.order || mongoose.model('order',orderSchema)

export default Order;
