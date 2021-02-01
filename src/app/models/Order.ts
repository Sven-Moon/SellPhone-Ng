import { OrderDetail } from "./OrderDetail";

export interface Order {
  id: string,
  total: number,
  details: Array<OrderDetail>
}