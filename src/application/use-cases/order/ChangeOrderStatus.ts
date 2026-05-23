import { OrderStatus } from "../../../domain/entities/Order.js";
import { NotFoundError } from "../../../domain/errors/NotFoundError.js";
import type { IOrderRepository } from "../../repositories/IOrderRepository.js";

export interface ChangeOrderStatusDTO {
  orderId: string;
  newOrderStatus: OrderStatus;
}

export class ChangeOrderStatusUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(data: ChangeOrderStatusDTO) {
    const order = await this.orderRepository.findById(data.orderId);

    if (!order) {
      throw new NotFoundError("Order");
    }

    order.transitionTo(data.newOrderStatus);

    await this.orderRepository.changeOrderStatus(
      data.orderId,
      data.newOrderStatus,
    );
  }
}
