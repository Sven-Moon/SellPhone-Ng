import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SaleOrderDetail } from "src/app/models/SaleOrderDetail";
import { saleOrderDetailFeatureKey, SaleOrderDetailState } from "./sale-calculator.reducer";

export const selectSaleOrderDetailState =
createFeatureSelector<SaleOrderDetailState>(saleOrderDetailFeatureKey)

export const selectSaleOrderDetail =
createSelector(
  selectSaleOrderDetailState,
  (state: SaleOrderDetail) => state
)
