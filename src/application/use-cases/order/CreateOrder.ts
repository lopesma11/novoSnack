import { randomUUID } from "crypto";
import { Order } from "../../../domain/entities/Order.js";
import type { IOrderRepository } from "../../repositories/IOrderRepository.js";
import { Quantity } from "../../../domain/value-objects/Quantity.js";

export interface CreateOrderDTO {
  table: string;
  products: { product: string; quantity: number }[];
}

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(data: CreateOrderDTO): Promise<Order> {
    const orderItems = data.products.map((item) => ({
      itemId: item.product,
      quantityItem: new Quantity(item.quantity),
    }));

    const order = new Order(randomUUID(), data.table, orderItems);

    await this.orderRepository.save(order);
    return order;
  }
}
