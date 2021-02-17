import { createReducer, on } from '@ngrx/store';
import { SaleOrderDetail } from 'src/app/models/SaleOrderDetail';
import * as fromSaleCalculatorActions from './sale-calculator.actions'

export const saleOrderDetailFeatureKey = "saleOrderDetail";

export interface SaleOrderDetailState extends SaleOrderDetail {

}

export const initialState: SaleOrderDetailState = {
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
