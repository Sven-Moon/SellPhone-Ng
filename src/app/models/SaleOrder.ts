import { SaleOrderDetail } from './SaleOrderDetail'

export interface SaleOrder {
  orderId: string,
  total: number,
  orderDate: string,
  orderStatus: string,
  orderItems: number,
  orderDetails: Array<SaleOrderDetail>
}
