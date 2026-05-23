import type { IOrderRepository } from "../../repositories/IOrderRepository.js";

export interface CancelOrderDTO {
  orderId: string;
}

export class CancelOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(data: CancelOrderDTO) {
    await this.orderRepository.delete(data.orderId);
  }
}
