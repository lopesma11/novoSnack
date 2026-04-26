import { Order } from "../../../domain/entities/Order";
import { IOrderRepository } from "../../repositories/IOrderRepository";

export class ListOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();
    return orders;
  }
}
