import { Order } from "../../../domain/entities/Order.js";
import type { IOrderRepository } from "../../repositories/IOrderRepository.js";

export class ListOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();
    return orders;
  }
}
