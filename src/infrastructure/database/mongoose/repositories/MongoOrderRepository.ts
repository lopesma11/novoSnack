import type { IOrderRepository } from "../../../../application/repositories/IOrderRepository.js";
import { Order, OrderStatus } from "../../../../domain/entities/Order.js";
import type { OrderItem } from "../../../../domain/entities/Order.js";
import { Quantity } from "../../../../domain/value-objects/Quantity.js";
import { OrderModel } from "../models/OrderModel.js";

export class MongoOrderRepository implements IOrderRepository {
  async save(order: Order): Promise<Order> {
    await OrderModel.create({
      _id: order.orderId,
      customerId: order.customerId,
      orderStatus: order.getStatus(),
      orderItems: order.orderItem.map((item) => ({
        itemId: item.itemId,
        quantityItem: item.quantityItem.getValue(),
      })),
      createdAt: order.createdAt,
    });
    return order;
  }

  async findAll(): Promise<Order[]> {
    const docs = await OrderModel.find().lean();

    return docs.map((doc) => this.toEntity(doc));
  }

  async findById(orderId: string): Promise<Order | null> {
    const doc = await OrderModel.findById(orderId).lean();

    if (!doc) return null;

    return this.toEntity(doc);
  }

  async changeOrderStatus(
    orderId: string,
    newOrderStatus: OrderStatus,
  ): Promise<void> {
    await OrderModel.findByIdAndUpdate(orderId, {
      orderStatus: newOrderStatus,
    });
  }

  async delete(orderId: string): Promise<void> {
    await OrderModel.findByIdAndDelete(orderId);
  }

  private toEntity(doc: any): Order {
    const orderItems: OrderItem[] = doc.orderItems.map((item: any) => ({
      itemId: item.itemId,
      quantityItem: new Quantity(item.quantityItem),
    }));

    return new Order(doc._id, doc.customerId, orderItems);
  }
}
