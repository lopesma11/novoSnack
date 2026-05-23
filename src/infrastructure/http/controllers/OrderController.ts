import type { Request, Response, NextFunction } from "express";
import { CreateOrderUseCase } from "../../../application/use-cases/order/CreateOrder.js";
import { ListOrdersUseCase } from "../../../application/use-cases/order/ListOrders.js";
import { CancelOrderUseCase } from "../../../application/use-cases/order/CancelOrder.js";
import { ChangeOrderStatusUseCase } from "../../../application/use-cases/order/ChangeOrderStatus.js";

export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly listOrdersUseCase: ListOrdersUseCase,
    private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase,
  ) {}

  async handleCreate(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { customerId, orderItem } = request.body;

      await this.createOrderUseCase.execute({ customerId, orderItem });

      return response
        .status(201)
        .json({ message: "Order created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async handleList(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const orders = await this.listOrdersUseCase.execute();
      return response.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async handleChangeStatus(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { orderId } = request.params;

      const { newOrderStatus } = request.body;

      await this.changeOrderStatusUseCase.execute({ orderId, newOrderStatus });

      return response
        .status(200)
        .json({ message: "Order status changed successfully" });
    } catch (error) {
      next(error);
    }
  }

  async handleCancel(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { orderId } = request.params;

      await this.cancelOrderUseCase.execute({ orderId });
      return response
        .status(200)
        .json({ message: "Order canceled successfully" });
    } catch (error) {
      next(error);
    }
  }
}
