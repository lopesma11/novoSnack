import { OrderStatus } from "../../../domain/entities/Order";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { IOrderRepository } from "../../repositories/IOrderRepository";

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
