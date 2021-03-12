import { SaleOrderDetail } from './SaleOrderDetail'

export interface SaleOrder {
  orderId: string,
  total: number,
  orderDate: string,
  orderStatus: "incomplete" | "new" | "pending" | "cancelled" | "complete" | null
  orderItems: number,
  orderDetails: Array<SaleOrderDetail>
}
