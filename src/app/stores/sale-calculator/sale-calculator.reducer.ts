
import { state } from '@angular/animations'
import { createReducer, on } from '@ngrx/store'
import { SaleOrder } from 'src/app/models/SaleOrder'
import { SaleOrderDetail } from 'src/app/models/SaleOrderDetail'
import * as fromSaleCalculatorActions from './sale-calculator.actions'
// import { selectOrderDetail } from './sale-calculator.selectors'
// import { deleteOrderDetail } from '../../helpers/helpers'

export const saleOrderFeatureKey = 'saleOrder'

export interface SaleOrderState extends SaleOrder {

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
      orderDetails: {
        ...state.orderDetails,
        [action.formIndex]: {
          ...state.orderDetails[action.formIndex],
          phoneType: action.selectedPhoneType
        }
      }
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
    (state, action) => {


      return ({
        ...state,
        orderItems: state.orderItems + 1,
        orderDetails: {
          ...state.orderDetails,
          [action.index + 1]: initialState.orderDetails[0]
        }
      })
    }
  ),

  on(fromSaleCalculatorActions.shiftDetailUp,
    (state, action) => {
      return ({
        ...state,
        orderDetails: {
          ...state.orderDetails,
          [action.index]: state.orderDetails[action.index - 1]
        }
      })
    }
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
    (state, action) => ({ ...state, total: action.total })
  ),

  on(fromSaleCalculatorActions.removeLine,
    (state, action) => {
      let i = 0
      let newArray: SaleOrderDetail[]
      state.orderDetails.forEach(x => {
        if (i !== action.index) {
          newArray.push(x)
        }
        i++
      })
      newArray = [
        ...state.orderDetails.slice(0, action.index),
        ...state.orderDetails.slice(action.index + 1)
      ]

      return {
        ...state,
        orderDetails: newArray
        // .slice(0, action.index),
        // ...state.orderDetails.values.prototype.slice(action.index + 1)
      }
    }

  )

)
