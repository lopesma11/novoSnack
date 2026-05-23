import mongoose from "mongoose";
import { OrderStatus } from "../../../../domain/entities/Order.js";

const orderItemSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true },
    quantityItem: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    orderItems: { type: [orderItemSchema], required: true },
  },
  {
    timestamps: true, // cria automaticamente os campos createdAt e updatedAt
  },
);

// O Model é o que você usa para fazer as queries no banco.
export const OrderModel = mongoose.model("Order", orderSchema);
