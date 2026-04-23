import { Order, OrderStatus } from "../../domain/entities/Order";

export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findAll(): Promise<Order[]>;
  changeStatus(orderId: string, newOrderStatus: OrderStatus): Promise<void>;
  delete(orderId: string): Promise<void>;
}
