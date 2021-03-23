
import { EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { SaleOrder } from 'src/app/models/SaleOrder'
import { SaleOrderDetail } from 'src/app/models/SaleOrderDetail'
import * as fromSaleCalculatorActions from './sale-calculator.actions'

export const saleOrderFeatureKey = 'saleOrder'

export interface SaleOrderState extends SaleOrder {

}

export interface SaleOrderDetailState extends EntityState<SaleOrderDetail> {

}

export const initialState: SaleOrderState = {
  orderId: null,
  total: null,
  orderDate: null,
  orderStatus: null,
  orderItems: null,
  orderDetails: [{
    phoneType: { typeId: null, name: null },
    phoneModel: { modelId: null, name: null, maxValue: null },
    phoneCondition: null,
    quantity: null,
    subTotal: null
  }]
}

export const saleCalculatorReducer = createReducer(
  initialState,
  // update inputs from estimator

  on(fromSaleCalculatorActions.updateSelectedPhoneType,
    (state, action) => ({
      ...state,
      orderDetails: [
        ...state.orderDetails, {
          ...state.orderDetails[action.formIndex],
          phoneType: action.selectedPhoneType
        }
      ]
    })
  ),

  on(fromSaleCalculatorActions.updateSelectedPhoneModel,
    (state, action) => ({
      ...state,
      orderDetails: {
        ...state.orderDetails,
        [action.formIndex]: {
          ...state.orderDetails[action.formIndex],
          phoneModel: action.selectedPhoneModel
        }
      }
    })
  ),

  on(fromSaleCalculatorActions.addFormSection,
    (state) => (
      {
        ...state,
        orderItems: state.orderItems + 1,
        // orderDetails: {
        //   ...state.orderDetails,
        //   [state.orderItems]: {
        //     ...state.orderDetails[state.orderItems],
        //     lineId: state.orderItems + 1
        //   }
        // }
      }
    )
  ),

  on(fromSaleCalculatorActions.updateCondition,
    (state, action) => ({
      ...state,
      orderDetails: {
        ...state.orderDetails,
        [action.formIndex]: {
          ...state.orderDetails[action.formIndex],
          phoneCondition: action.condition
        }
      }
    })
  ),

  on(fromSaleCalculatorActions.updateQuantity,
    (state, action) => ({
      ...state,
      orderDetails: {
        ...state.orderDetails,
        [action.formIndex]: {
          ...state.orderDetails[action.formIndex],
          quantity: action.quantity
        }
      }
    })
  ),

  on(fromSaleCalculatorActions.updateSubtotal,
    (state, action) => ({
      ...state,
      orderDetails: {
        ...state.orderDetails,
        [action.formIndex]: {
          ...state.orderDetails[action.formIndex],
          subTotal: action.subTotal
        }
      }
    })
  ),

  on(fromSaleCalculatorActions.updateTotal,
    (state,action) => ({
      ...state, total: action.total
  })),

  on(fromSaleCalculatorActions.removeLine,
    (state,action) => ( {
      ...state,
      orderDetails: {
        ...state => Object.keys(state.orderDetails)
        .map(key => {
          state.orderDetails[key]
        })
      }
    })
  )

)
