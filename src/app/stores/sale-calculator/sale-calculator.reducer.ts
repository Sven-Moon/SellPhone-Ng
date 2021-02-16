import { createReducer, on } from '@ngrx/store';
import { OrderDetail } from 'src/app/models/OrderDetail';
import * as fromSaleCalculatorActions from './sale-calculator.actions'

export const orderDetailFeatureKey = "orderDetail";

export interface OrderDetailState extends OrderDetail {

}

export const initialState: OrderDetailState = {
  lineId: null,
  selectedPhoneType: {typeId:null, name: null},
  selectedPhoneModel: { modelId: null, name:null, maxValue: null},
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

  on(fromSaleCalculatorActions.updateSelectedPhoneModel,
    (state,action) => (
      {...state, selectedPhoneModel: action.selectedPhoneModel})
  ),

  on(fromSaleCalculatorActions.updateSelectedPhoneConditionId,
    (state,action) => (
      {...state, phoneConditionId: action.selectedPhoneConditionId})
  )
);
