import { Order, OrderStatus } from "../../domain/entities/Order";

export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findById(orderId: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  changeOrderStatus(
    orderId: string,
    newOrderStatus: OrderStatus,
  ): Promise<void>;
  delete(orderId: string): Promise<void>;
}
