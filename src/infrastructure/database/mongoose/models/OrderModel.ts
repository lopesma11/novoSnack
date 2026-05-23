import mongoose from "mongoose";
import { OrderStatus } from "../../../../domain/entities/Order.js";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    table: { type: String, required: true },
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.WAITING,
    },
    orderItems: { type: [orderItemSchema], required: true },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = mongoose.model("Order", orderSchema);
