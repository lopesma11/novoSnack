import { Order, OrderItem } from "../../../domain/entities/Order";
import { IOrderRepository } from "../../repositories/IOrderRepository";

export interface CreateOrderDTO {
  customerId: string;
  orderItem: OrderItem[];
}

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(data: CreateOrderDTO): Promise<Order> {
    const orderItems = data.orderItem.map((item) => ({
      itemId: item.itemId,
      quantityItem: item.quantityItem,
    }));

    const order = new Order(randomUUID(), data.customerId, orderItems);

    await this.orderRepository.save(order);
    return order;
  }
}
