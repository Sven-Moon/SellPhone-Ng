import { OrderDetail } from "./OrderDetail";

export interface Order {
  id: string,
  total: number,
  date: string,
  details: Array<OrderDetail>
}
