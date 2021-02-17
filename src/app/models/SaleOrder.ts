import { SaleOrderDetail } from "./SaleOrderDetail";

export interface SaleOrder {
  orderId: string,
  total: number,
  orderDate: string,
  orderStatus: string,
  orderDetails: Array<SaleOrderDetail>
}
