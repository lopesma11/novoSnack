import { Quantity } from "../value-objects/Quantity";

export enum OrderStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface OrderItem {
  itemId: string;
  quantityItem: Quantity;
}

export class Order {
  readonly orderId: string;
  readonly customerId: string;
  readonly createdAt: Date;
  readonly orderItem: OrderItem[];

  private orderStatus: OrderStatus;

  constructor(orderId: string, customerId: string, orderItem: OrderItem[]) {
    this.validateOrderItem(orderItem);
    this.orderId = orderId;
    this.customerId = customerId;
    this.createdAt = new Date();
    this.orderItem = orderItem;
    this.orderStatus = OrderStatus.PENDING;
  }

  getStatus(): OrderStatus {
    return this.orderStatus;
  }

  transitionTo(newOrderStatus: OrderStatus): void {
    const validTransitions: Record<OrderStatus, OrderStatus | null> = {
      [OrderStatus.PENDING]: OrderStatus.IN_PROGRESS,
      [OrderStatus.IN_PROGRESS]: OrderStatus.COMPLETED,
      [OrderStatus.COMPLETED]: null,
    };

    const allowed = validTransitions[this.orderStatus];

    if (allowed !== newOrderStatus) {
      throw new Error(
        `Transição inválida: ${this.orderStatus} -> ${newOrderStatus}. Permitido: ${this.orderStatus} -> ${allowed}`,
      );
    }
    this.orderStatus = newOrderStatus;
  }

  private validateOrderItem(orderItem: OrderItem[]): void {
    if (orderItem.length === 0) {
      throw new Error(`Um pedido deve conter pelo menos um item.`);
    }

    const hasInvalidQuantity = orderItem.some((item) =>
      item.quantityItem.getValue() <= 0,
    );

    if (hasInvalidQuantity) {
      throw new Error(`A quantidade de cada item deve ser maior que zero.`);
    }
  }
}
