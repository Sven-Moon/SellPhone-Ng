import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { OrderDetail } from 'src/app/models/OrderDetail';
import * as fromSaleCalculatorActions from './sale-calculator.actions'

export const orderDetailFeatureKey = "orderDetail";

export interface OrderDetailState extends OrderDetail {

}

export const initialState: OrderDetailState = {
  lineId: null,
  phoneTypeId: null,
  phoneModelId: null,
  phonecondition: null,
  quantity: null,
  subTotal: null
}


export const saleCalculatorReducer = createReducer(
  initialState,
  // update inputs from estimator
  on(fromSaleCalculatorActions.updateSelectedPhoneTypeId, 
    (state,action) => (
      {...state, phoneTypeId: action.selectedPhoneTypeId})
  ),
  on(fromSaleCalculatorActions.updateSelectedPhoneModelId, 
    (state,action) => (
      {...state, phoneModelId: action.selectedPhoneModelId})
  ),
  on(fromSaleCalculatorActions.updateSelectedPhoneConditionId, 
    (state,action) => (
      {...state, phoneConditionId: action.selectedPhoneConditionId})
  )
);
