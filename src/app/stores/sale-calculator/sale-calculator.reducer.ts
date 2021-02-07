import { createReducer, on } from '@ngrx/store';
import { OrderDetail } from 'src/app/models/OrderDetail';
import * as fromSaleCalculatorActions from './sale-calculator.actions'

export const orderDetailFeatureKey = "orderDetail";

export interface OrderDetailState extends OrderDetail {

}

export const initialState: OrderDetailState = {
  lineId: null,
  selectedPhoneType: {typeId:null, name: null},
  phoneModelId: null,
  phoneCondition: null,
  quantity: null,
  subTotal: null
}


export const saleCalculatorReducer = createReducer(
  initialState,
  // update inputs from estimator
  on(fromSaleCalculatorActions.updateSelectedPhoneType,
    (state,action) => ({
      ...state, selectedPhoneType: action.phoneType
      }
    )
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
