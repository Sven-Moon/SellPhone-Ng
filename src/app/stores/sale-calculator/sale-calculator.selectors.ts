import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SaleOrder } from 'src/app/models/SaleOrder'
import { saleOrderFeatureKey, SaleOrderState } from './sale-calculator.reducer'

export const selectSaleOrderState =
createFeatureSelector<SaleOrderState>(saleOrderFeatureKey)

export const selectSaleOrder =
createSelector(
  selectSaleOrderState,
  (state: SaleOrder) => state
)

export const selectOrderDetail =
createSelector(
  selectSaleOrderState,
  (state) => Object.keys(state.orderDetails)
  .map(key => state.orderDetails[key])
)
