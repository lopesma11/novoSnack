import { InvalidTransitionError } from "../errors/InvalidTransitionError.js";
import { Quantity } from "../value-objects/Quantity.js";

export enum OrderStatus {
  WAITING = "waiting",
  IN_PRODUCTION = "in_production",
  DONE = "done",
}

export type OrderItem = {
  itemId: string;
  quantityItem: Quantity;
};

export class Order {
  readonly orderId: string;
  readonly table: string;
  readonly createdAt: Date;
  readonly orderItem: OrderItem[];

  private orderStatus: OrderStatus;

  constructor(orderId: string, table: string, orderItem: OrderItem[]) {
    this.validateOrderItem(orderItem);
    this.orderId = orderId;
    this.table = table;
    this.createdAt = new Date();
    this.orderItem = orderItem;
    this.orderStatus = OrderStatus.WAITING;
  }

  getStatus(): OrderStatus {
    return this.orderStatus;
  }

  transitionTo(newOrderStatus: OrderStatus): void {
    const validTransitions: Record<OrderStatus, OrderStatus | null> = {
      [OrderStatus.WAITING]: OrderStatus.IN_PRODUCTION,
      [OrderStatus.IN_PRODUCTION]: OrderStatus.DONE,
      [OrderStatus.DONE]: null,
    };

    const allowed = validTransitions[this.orderStatus];

    if (allowed !== newOrderStatus) {
      throw new InvalidTransitionError(this.orderStatus, newOrderStatus);
    }
    this.orderStatus = newOrderStatus;
  }

  private validateOrderItem(orderItem: OrderItem[]): void {
    if (orderItem.length === 0) {
      throw new Error(`Um pedido deve conter pelo menos um item.`);
    }

    const hasInvalidQuantity = orderItem.some(
      (item) => item.quantityItem.getValue() <= 0,
    );

    if (hasInvalidQuantity) {
      throw new Error(`A quantidade de cada item deve ser maior que zero.`);
    }
  }
}
