import { SaleOrderDetail } from "./SaleOrderDetail";

export interface SaleOrder {
  id: string,
  total: number,
  date: string,
  details: Array<SaleOrderDetail>
}
