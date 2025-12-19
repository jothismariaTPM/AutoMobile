import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    payment_type: { type: String, enum: ["card", "upi", "netbanking", "cod", "online"], required: true },
    payment_status: { type: String, enum: ["pending", "completed", "failed", "refunded"], default: "pending" },
    transaction_id: { type: String, default: null },
    amount: { type: Number, required: true }
  },{ timestamps: { createdAt: "payment_date", updatedAt: "updated_at" }});

const Payment = mongoose.models.payment || mongoose.model('payment',paymentSchema)

export default Payment;