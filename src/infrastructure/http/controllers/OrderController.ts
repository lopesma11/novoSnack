import type { Request, Response } from "express";
import { CreateOrderUseCase } from "../../../application/use-cases/order/createOrder";

export class OrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  async handle(request: Request, response: Response): Promise<void> {
    try {
      const { customerId, orderItem } = request.body;

      await this.createOrderUseCase.execute({ customerId, orderItem });

      return response
        .status(201)
        .json({ message: "Order created successfully" });
    } catch (error) {
      console.error("Error creating order:", error);
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
