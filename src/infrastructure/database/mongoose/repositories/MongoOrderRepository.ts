import { IOrderRepository } from "../../../../application/repositories/IOrderRepository";
import {
  Order,
  OrderItem,
  OrderStatus,
} from "../../../../domain/entities/Order";
import { Quantity } from "../../../../domain/value-objects/Quantity";
import { OrderModel } from "../models/OrderModel";

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

  async changeStatus(
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
