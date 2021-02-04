import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderDetail } from "src/app/models/OrderDetail";
import { orderDetailFeatureKey, OrderDetailState } from "./sale-calculator.reducer";

export const selectOrderDetailState = 
createFeatureSelector<OrderDetailState>(orderDetailFeatureKey)

export const selectOrderDetail = 
createSelector(
  selectOrderDetailState,
  (state: OrderDetail) => state
)